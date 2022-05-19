import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {GraphComponent} from "./components/graph/graph.component";
import {AuthGuard} from "./auth/auth.guard";
import {environment} from "../environments/environment";

const routes: Routes = [
  { path: '', component: TransactionListComponent , canActivate: [AuthGuard]},
  {path: 'overview', redirectTo: ''},
  { path: 'statistics', component: GraphComponent },
  {path: 'userAccount', redirectTo:`${environment.keycloak.url}/realm/${environment.keycloak.realm}/account/`},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
