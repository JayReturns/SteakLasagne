import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {GraphComponent} from "./components/graph/graph.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: "full"},
  { path: 'overview', component: TransactionListComponent, canActivate: [AuthGuard]},
  { path: 'statistics', component: GraphComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
