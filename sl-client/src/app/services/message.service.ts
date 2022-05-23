import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar,
              private titleService: Title) { }

  log(message?: string) {
    console.log(message);
  }

  notifyUser(message: string) {
    this.snackbar.open(message,  "", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }

  notifyUserError() {
    this.snackbar.open('Ein Fehler ist aufgetreten!', "Schließen", {
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }

  notifyUserNoAccess() {
    this.snackbar.open('Keine Berechtigung!', 'Schließen', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
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
          this.notifyUserError();
        }
      } else {
        this.notifyUserError();
      }
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  setTitle(title: string) {
    this.titleService.setTitle((title))
  }
}
