import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {Transaction} from "../models/transaction.model";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = `${environment.baseApiUrl}/transaction`

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url)
      .pipe(
        tap(_ => this.messageService.log("fetched all transactions")),
        catchError(this.messageService.handleError<Transaction[]>('getTransactions', []))
      );
  }



















}
