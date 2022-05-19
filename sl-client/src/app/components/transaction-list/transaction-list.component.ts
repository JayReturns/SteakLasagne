import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {MessageService} from "../../services/message.service";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

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


  constructor(private transactionService: TransactionService,
              private dialogRef: MatDialog,
              private messageService: MessageService,
              private keyCloak: KeycloakService,
              private userService: UserService) {
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
        this.currentValue = this.user.currentAmount / 10
      })

    });


    // this.userService.updateUser(this.user)
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
              currentAmount: this.user.currentAmount + (input.value * 10),
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
              currentAmount: this.user.currentAmount + (input.value * 10),
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

}
