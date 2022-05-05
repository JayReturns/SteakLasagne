import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'expense-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  map: Map<number, Transaction[]> = new Map<number, Transaction[]>()

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(result => {
      this.transactions = result;

      for (let transaction of this.transactions) {
        transaction.date = new Date(transaction.date);
        transaction.date.setHours(0, 0, 0, 0);
        let time = transaction.date.getTime();
        if (this.map.has(time)) {
          this.map.set(time, [...this.map.get(time)!, transaction]);
        } else {
          this.map.set(time, [transaction]);
        }
      }
      console.log(this.map);
    });
  }

}
