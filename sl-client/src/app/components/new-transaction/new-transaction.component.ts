import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent{

  constructor(private dialog: MatDialog, private transactionService: TransactionService) {
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      dialogTitle: "Neue Transaktion"
    }
    const dialogRef = this.dialog.open(TransactionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("New Transaction:", data);

        this.transactionService.createTransaction(data).subscribe(result => console.log(result))
      },

    );

  }



}
