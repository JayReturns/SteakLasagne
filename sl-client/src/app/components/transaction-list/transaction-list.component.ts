import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {MessageService} from "../../services/message.service";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
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
  user?: User;
  tempMap: Map<number, Transaction[]> = new Map<number, Transaction[]>()
  displayMap: Map<number, Transaction[]> = new Map<number, Transaction[]>()
  userId?: string;
  dialogConfig = new MatDialogConfig();
  showIncome: boolean = true;
  showExpense: boolean = true;
  sortOrder: string = "newest";
  currentValue: number = 0;

  linkPrefix = environment.baseApiUrl;

  menuTopLeftPosition = {x: '0', y: '0'};

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger | undefined;

  constructor(private transactionService: TransactionService,
              private dialogRef: MatDialog,
              private messageService: MessageService,

              private keyCloak: KeycloakService,
              private userService: UserService,
              private invoiceService: InvoiceService) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.width = "50%";
  }

  async ngOnInit() {
    const userProfile = await this.keyCloak.loadUserProfile();
    this.userId = userProfile.id;
    this.updateTransactions();
  }

  updateTransactions(): void {
    this.transactionService.getTransactions(this.userId).subscribe(result => {
      this.transactions = result;
      this.tempMap.clear()

      for (let transaction of this.transactions) {
        transaction.date = new Date(transaction.date); //Macht aus einem "Datum" ein Datum!
        transaction.date.setHours(0, 0, 0, 0); //Setzt die Zeit im Datum aus Mitternacht (00:00:00:00)
        let time = transaction.date.getTime() //erstelle einen Unix Zeitstempel time
        if (this.showIncome && transaction.value > 0 || this.showExpense && transaction.value < 0) {
          if (this.tempMap.has(time)) {
            this.tempMap.set(time, [...this.tempMap.get(time)!, transaction]);
          } else {
            this.tempMap.set(time, [transaction]);
          }
        }
      }
      if (this.tempMap.size === 0) {
        this.messageService.notifyUser("Keine Transaktionen gefunden. Bitte Filtereinstellungen anpassen.")
      }
      this.userService.getUser(this.userId).subscribe(result => {
        this.user = result
        this.currentValue = this.user.currentAmount
      })
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
      title: "Transaktion bearbeiten",
      userId: this.userId
    };
    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);
    dialog.afterClosed().subscribe(input => {
      if (input) {
        this.transactionService.updateTransaction(input).subscribe(transactionResult => {
          this.userService.getUser(this.userId).subscribe(result => {
            this.user = result
            let updatedUser: User = {
              id: this.user?.id!,
              currentAmount: this.user.currentAmount - (transaction.value) + (input.value),
              friendlyName: this.user?.friendlyName!
            }
            this.userService.updateUser(updatedUser).subscribe(_ => {
              this.messageService.notifyUser(`Transaktion "${transactionResult.title}" erfolgreich geändert`);
              this.updateTransactions();
            })
          });
        })
      }
    })
  }

  addTransaction() {
    this.dialogConfig.data = {
      title: "Neue Transaktion",
      userId: this.userId
    }
    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);
    dialog.afterClosed().subscribe(input => {
      if (input) {
        this.transactionService.createTransaction(input).subscribe(transactionResult => {

          this.userService.getUser(this.userId).subscribe(result => {
            this.user = result
            let updatedUser: User = {
              id: this.user?.id!,
              currentAmount: this.user.currentAmount + (input.value),
              friendlyName: this.user?.friendlyName!
            }
            this.userService.updateUser(updatedUser).subscribe(_ => {
              this.messageService.notifyUser(`Transaktion "${transactionResult.title}" erfolgreich gespeichert`);
              this.updateTransactions();
            })
          })
        })
      }
    })
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
