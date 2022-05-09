import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  map: Map<number, Transaction[]> = new Map<number, Transaction[]>()

  dialogConfig = new MatDialogConfig();

  constructor(private transactionService: TransactionService,
              private dialogRef: MatDialog,
              private messageService: MessageService) {
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
        transaction.date = new Date(transaction.date);
        transaction.date.setHours(0, 0, 0, 0);
        let time = transaction.date.getTime();
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
          console.log(result);
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

}
