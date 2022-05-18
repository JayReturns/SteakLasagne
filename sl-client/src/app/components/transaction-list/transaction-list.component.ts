import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {MessageService} from "../../services/message.service";
import {Invoice} from "../../models/invoice.model";
import {InvoiceService} from "../../services/invoice.service";
import {environment} from "../../../environments/environment";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  map: Map<number, Transaction[]> = new Map<number, Transaction[]>()

  dialogConfig = new MatDialogConfig();

  linkPrefix = environment.baseApiUrl;

  menuTopLeftPosition = {x: '0', y: '0'};

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger | undefined;

  constructor(private transactionService: TransactionService,
              private dialogRef: MatDialog,
              private messageService: MessageService,
              private invoiceService: InvoiceService) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.width = "50%";
  }

  ngOnInit(): void {
    this.updateTransactions();
  }

  updateTransactions(): void {
    this.transactionService.getTransactions().subscribe(result => {
      this.transactions = result;

      this.map.clear();

      for (let transaction of this.transactions) {
        transaction.date = new Date(transaction.date); //Macht aus einem "Datum" ein Datum!
        transaction.date.setHours(0, 0, 0, 0); //Setzt die Zeit im Datum aus Mitternacht (00:00:00:00)
        let time = transaction.date.getTime() //erstelle einen Unix Zeitstempel time
        if (this.map.has(time)) {
          this.map.set(time, [...this.map.get(time)!, transaction]);
        } else {
          this.map.set(time, [transaction]);
        }
      }
    });
  }

  deleteTransaction(id: string) {
    (this.transactionService.deleteTransaction(id, true) as Observable<any>).subscribe(_ => {
      this.updateTransactions();
    })
  }

  editTransaction(transaction: Transaction) {

    this.dialogConfig.data = {
      transaction: transaction,
      title: "Transaktion bearbeiten"
    };

    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);

    dialog.afterClosed().subscribe(input => {
      if (input) {
        this.transactionService.updateTransaction(input).subscribe(result => {
          this.updateTransactions();
        });
        this.messageService.notifyUser(`Transaktion "${transaction.title}" erfolgreich geändert`) ;
      }
    })
  }

  addTransaction() {
    this.dialogConfig.data = {
      title: "Neue Transaktion"
    }
    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);

    dialog.afterClosed().subscribe(input => {
      if (input) {
        this.transactionService.createTransaction(input).subscribe(result => {
          this.updateTransactions();
          this.messageService.notifyUser(`Transaktion "${result.title}" erfolgreich gespeichert`) ;
        })
      }
    });
  }

  uploadInvoice(event: any, transaction: Transaction) {
    if (!(event.target.files && event.target.files.length)) return;

    const reader = new FileReader();

    const [file] = event.target.files;
    const type = file.type;

    if (type != 'application/pdf') {
      if (!confirm("Datei ist keine PDF-Datei! Wirklich hochladen?")) {
        return;
      }
    }

    reader.readAsDataURL(file);

    reader.onload = () => {
      let result = (reader.result as string).replace(`data:${type};base64,`, '');
      const invoice: Invoice = {
        id: transaction.invoice?.id,
        mimeType: type,
        data: result,
        fileName: file.name
      };

      const observable = transaction.invoiceLink ?
        this.invoiceService.updateInvoice(invoice) :
        this.invoiceService.createInvoice(transaction.id, invoice);

      observable.subscribe(_ => this.updateTransactions());

    }
  }

  deleteInvoice(transaction: Transaction) {
    if (!transaction.invoiceLink) return;

    if (!confirm("Rechnung wirklich löschen?")) return;

    this.invoiceService.deleteInvoice(transaction.invoice!.id!, transaction.id).subscribe(_ => this.updateTransactions());
  }

  onRightClick(event: MouseEvent, transaction: Transaction) {
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    this.matMenuTrigger!.menuData = {transaction: transaction};

    this.matMenuTrigger?.openMenu();
  }

}
