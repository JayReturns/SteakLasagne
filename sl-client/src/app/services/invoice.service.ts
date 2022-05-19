import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {Invoice} from "../models/invoice.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = `${environment.baseApiUrl}/invoice`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  createInvoice(transactionId: string, invoice: Invoice): Observable<Invoice> {
    const url = `${this.url}/${transactionId}`;

    return this.http.post<Invoice>(url, invoice, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`created invoice for transaction with id ${transactionId}`)),
        catchError(this.messageService.handleError<Invoice>('createInvoice'))
      );
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put(this.url, invoice, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`updated invoice with id ${invoice.id}`)),
        catchError(this.messageService.handleError<any>('updateInvoice'))
      )
  }

  deleteInvoice(invoiceId: number, transactionId: string): Observable<any> {
    const url = `${this.url}/delete?invoiceId=${invoiceId}&transactionId=${transactionId}`;
    return this.http.delete(url).pipe(
      tap(_ => this.messageService.log(`deleted invoice with id ${invoiceId}`)),
      catchError(this.messageService.handleError('deleteInvoice'))
    );
  }

}
