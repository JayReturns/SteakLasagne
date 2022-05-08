import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {Transaction} from "../../models/transaction.model";
import {TransactionService} from "../../services/transaction.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent {
  @Input() transaction?: Transaction

  constructor(private dialog: MatDialog, private transactionService: TransactionService, private messageService: MessageService) {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = "50%";

    dialogConfig.data = {
      dialogTitle: "Transaktion bearbeiten",
      transactionId: this.transaction?.id,
      transactionTitle: this.transaction?.title,
      transactionDate: this.transaction?.date,
      transactionValue: this.transaction?.value,
      transactionNotice: this.transaction?.notice
    }

    const dialogRef = this.dialog.open(TransactionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {

        console.log("Edited Transaction:", data);
        if (data) {
          this.transactionService.updateTransaction(data).subscribe(result => console.log(result))
          this.messageService.notifyUser(`Transaktion "${data.title}" erfolgerich geändert`) ;
        }

        

      }
    );

  }

}
