import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../services/transaction.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Transaction} from "../../models/transaction.model";
import {MessageService} from "../../services/message.service";

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
  minDate!: Date;
  maxDate!: Date;
  valuePattern: string = '[0-9]*\.?[0-9]{0,2}';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private transactionService: TransactionService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.idControl = new FormControl();
    this.titleControl = new FormControl('',[Validators.required, Validators.maxLength(30)]);
    this.dateControl = new FormControl('',[Validators.required]);
    this.valueControl = new FormControl('',[Validators.required, Validators.pattern(this.valuePattern)]);
    this.noticeControl = new FormControl('',[Validators.maxLength(256)]);

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
    const date = new Date();
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());


  }

  close() {
    this.dialogRef.close();
  }

  save() {

    console.log("Errors", this.titleControl.errors, this.dateControl.errors, this.valueControl.errors, this.noticeControl.errors)
    if (this.transactionInput.valid) {
    this.transactionInput.value.date.setDate(this.transactionInput.value.date.getDate() + 1)
    this.dialogRef.close(this.transactionInput.value);
    }

  }
}
