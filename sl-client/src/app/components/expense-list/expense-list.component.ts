import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  transactions: Transaction[] = [];
  dataSource = new MatTableDataSource(this.transactions);
  displayedColumns = ["id", "title", "category", "notice", "value", "date"];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(result => {
      console.log(result)
      this.transactions = result;
      this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
    })
  }

}
