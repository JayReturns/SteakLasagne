import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, tap} from "rxjs";
import {GraphSet} from "../models/graphset.model";

@Injectable({
  providedIn: 'root'
})
export class GraphsetService {

  private url = `${environment.baseApiUrl}/graphset`


  constructor(private http: HttpClient, private messageService: MessageService) { }

  getGraphset(): Observable<GraphSet[]> {
    return this.http.get<GraphSet[]>(`${this.url}/?after=1970-01-01`)
      .pipe(
        tap(_ => this.messageService.log("fetched graphset")),
        catchError(this.messageService.handleError<GraphSet[]>('getGraphset', []))
      );
  }


}

