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
  amount!: number;
  note!: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTransactionDialogComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.id = data.transaction_id
    this.title = data.transaction_title
    this.date = data.transaction_date
    this.amount = data.transaction_amount
    this.note = data.transaction_note

    this.transaction_input = this.fb.group({
      id: [this.id, []],
      title: [this.title, []],
      date: [this.date, []],
      amount: [this.amount, []],
      note: [this.note, []]
    });
  }





  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.transaction_input.value);

  }
}
