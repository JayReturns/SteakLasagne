import {Component, Input} from '@angular/core';
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'expense-card-list',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent {

  @Input() transactions?: Transaction[];

}
