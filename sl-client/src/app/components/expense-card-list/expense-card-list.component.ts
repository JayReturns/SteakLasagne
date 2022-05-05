import {Component, Input} from '@angular/core';
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'expense-card-list',
  templateUrl: './expense-card-list.component.html',
  styleUrls: ['./expense-card-list.component.css']
})
export class ExpenseCardListComponent {

  @Input() transactions?: Transaction[];

}
