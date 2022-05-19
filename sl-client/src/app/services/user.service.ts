import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import { User} from "../models/user.model";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.baseApiUrl}/user`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUser(userId?: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`)
      .pipe(
        tap(_ => this.messageService.log("fetched all transactions")),
        catchError(this.messageService.handleError<User>('getUser'))
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`created transaction with id ${user.id}`)),
        catchError(this.messageService.handleError<User>('createUser'))
      );
  }

  updateUser(user: User): Observable <any> {

    return this.http.put<any>(this.url, user, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`updated user with id ${user.id}`)),
        catchError(this.messageService.handleError<any>('updateUser'))
      );
  }

  deleteUser(id: string, returnObservable?: boolean): (void | Observable<any>) {
    const deleteUrl = `${this.url}/${id}`;

    const result = this.http.delete(deleteUrl)
      .pipe(
        tap(_ => this.messageService.log(`deleted transaction with id ${id}`)),
        catchError(this.messageService.handleError('deleteUser'))
      );
    if (returnObservable)
      return result;
    else
      result.subscribe();
  }
}
