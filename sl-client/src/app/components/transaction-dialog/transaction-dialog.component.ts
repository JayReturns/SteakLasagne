import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../services/transaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent {

  dialogTitle: string = "TransactionDialog";
  transactionInput!: FormGroup;
  id!: string;
  title!: string;
  date!: Date;
  value!: number;
  notice!: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.dialogTitle = data.dialogTitle
    this.id = data.transactionId
    this.title = data.transactionTitle
    this.date = data.transactionDate
    this.value = data.transactionValue
    this.notice = data.transactionNotice

    this.transactionInput = this.fb.group({
      id: [this.id, []],
      title: [this.title, []],
      date: [this.date, []],
      value: [this.value, []],
      notice: [this.notice, []]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.transactionInput.value);

  }
}
