import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../../services/transaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrls: ['./edit-transaction-dialog.component.css']
})
export class EditTransactionDialogComponent {

  transaction_input!: FormGroup;
  id!: string;
  title!: string;
  date!: Date;
  value!: number;
  notice!: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTransactionDialogComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.id = data.transaction_id
    this.title = data.transaction_title
    this.date = data.transaction_date
    this.value = data.transaction_value
    this.notice = data.transaction_notice

    this.transaction_input = this.fb.group({
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
    this.dialogRef.close(this.transaction_input.value);

  }
}
