import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,

    TransactionListComponent,
    TransactionCardComponent,
    HeaderMenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
