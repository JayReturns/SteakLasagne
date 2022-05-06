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
  date!: Date;
  value!: number;
  notice!: string;

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
      value: [this.value, []],
      notice: [this.notice, []]
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.transaction.value);

  }


}
