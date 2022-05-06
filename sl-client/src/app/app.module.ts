import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MatDialogModule } from "@angular/material/dialog";
import {AppComponent} from './app.component';
import {NgChartsModule} from "ng2-charts";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderMenuComponent} from "./components/header-menu/header-menu.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { NewTransactionDialogComponent } from './components/new-transaction/new-transaction-dialog/new-transaction-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { EditTransactionDialogComponent } from './components/edit-transaction/edit-transaction-dialog/edit-transaction-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    TransactionCardComponent,
    HeaderMenuComponent,
    PageNotFoundComponent,
    NewTransactionComponent,
    NewTransactionDialogComponent,
    EditTransactionComponent,
    EditTransactionDialogComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewTransactionComponent, EditTransactionComponent]
})
export class AppModule { }
