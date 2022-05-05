import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  transactions: Transaction[] = [];
  map: Map<Date, Transaction[]> = new Map<Date, Transaction[]>()

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(result => {
      this.transactions = result;

      for (let transaction of this.transactions) {
        transaction.date = new Date(transaction.date);
        transaction.date.setHours(0, 0, 0, 0);
        if (this.map.has(transaction.date)) {
          this.map.set(transaction.date, [...this.map.get(transaction.date)!, transaction]);
        } else {
          this.map.set(transaction.date, [transaction]);
        }
      }
      console.log(this.map);
    });
  }

}
