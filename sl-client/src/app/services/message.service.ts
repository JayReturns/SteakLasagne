import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar) { }

  log(message?: string) {
    console.log(message);
  }

  notifyUser() {
    this.snackbar.open('Ein Fehler ist aufgetreten!', "Schließen", {
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  notifyUserNoAccess() {
    this.snackbar.open('Keine Berechtigung!', 'Schließen', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000
    });
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          this.notifyUserNoAccess();
        } else {
          this.notifyUser();
        }
      } else {
        this.notifyUser();
      }
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
