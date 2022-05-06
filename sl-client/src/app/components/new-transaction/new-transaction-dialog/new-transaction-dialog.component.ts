import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../../services/transaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.css']
})
export class NewTransactionDialogComponent implements OnInit {

  transaction!: FormGroup;
  title!: string;
  date!: number;
  amount!: number;
  note!: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTransactionDialogComponent>,
    private transactionService: TransactionService)
  {
  }




  ngOnInit(): void {
    this.transaction = this.fb.group({
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
    this.dialogRef.close(this.transaction.value);

  }


}
