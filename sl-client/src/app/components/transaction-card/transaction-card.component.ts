import {Component, Input} from '@angular/core';
import {Transaction} from "../../models/transaction.model";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent {


  constructor(private transactionService: TransactionService) {

  }


  @Input() transactions?: Transaction[];

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
  }



}
