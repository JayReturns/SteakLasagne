import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../services/transaction.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent {

  transaction?: Transaction;
  dialogTitle: string = "TransactionDialog";
  transactionInput!: FormGroup;
  idControl;
  titleControl;
  dateControl;
  valueControl;
  noticeControl;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.idControl = new FormControl();
    this.titleControl = new FormControl();
    this.dateControl = new FormControl();
    this.valueControl = new FormControl();
    this.noticeControl = new FormControl();

    if (data && data.transaction) {
      this.transaction = data.transaction;

      this.idControl.setValue(this.transaction!.id);
      this.titleControl.setValue(this.transaction!.title);
      this.dateControl.setValue(this.transaction!.date);
      this.valueControl.setValue(this.transaction!.value);
      this.noticeControl.setValue(this.transaction!.notice);
    }

    if (data && data.title) {
      this.dialogTitle = data.title;
    }

    this.transactionInput = fb.group({
      id: this.idControl,
      title: this.titleControl,
      date: this.dateControl,
      value: this.valueControl,
      notice: this.noticeControl
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.transactionInput.value);

  }
}
