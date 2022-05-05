import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgChartsModule} from "ng2-charts";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {ExpenseListComponent} from "./components/expense-list/expense-list.component";
import { ExpenseCardListComponent } from './components/expense-card-list/expense-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    ExpenseCardListComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
