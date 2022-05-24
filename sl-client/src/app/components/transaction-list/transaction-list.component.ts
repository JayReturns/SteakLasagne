import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction.model";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {MessageService} from "../../services/message.service";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Invoice} from "../../models/invoice.model";
import {InvoiceService} from "../../services/invoice.service";
import {environment} from "../../../environments/environment";
import {MatMenuTrigger} from "@angular/material/menu";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  user?: User;
  Map: Map<number, Transaction[]> = new Map<number, Transaction[]>();
  userId?: string;
  friendlyName?: string;
  dialogConfig = new MatDialogConfig();
  showIncome: boolean = true;
  showExpense: boolean = true;
  transactionCount: number = 0;
  sortOrder: string = "newest";
  currentValue: number = 0;
  linkPrefix = environment.baseApiUrl;
  order: any;
  isLoaded: boolean = false;
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger | undefined;


  constructor(private transactionService: TransactionService,
              private dialogRef: MatDialog,
              private messageService: MessageService,
              private keyCloak: KeycloakService,
              private userService: UserService,
              private invoiceService: InvoiceService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.width = "50%";
    this.iconRegistry.addSvgIcon('file-upload', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-upload-outline.svg'));
    this.iconRegistry.addSvgIcon('file-download', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-download-outline.svg'));
    this.iconRegistry.addSvgIcon('file-delete', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-cancel-outline.svg'));
    this.iconRegistry.addSvgIcon('file-edit', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-edit-outline.svg'));
  }

  async ngOnInit() {
    const userProfile = await this.keyCloak.loadUserProfile();
    this.userId = userProfile.id;
    this.friendlyName = userProfile.firstName;
    this.messageService.setTitle(`Übersicht - ${this.friendlyName}`);
    this.updateTransactions();

  }

  updateTransactions(): void {
    this.isLoaded = false
    this.transactionService.getTransactions(this.userId).subscribe(result => {

      this.transactions = result;
      this.Map.clear()

      this.transactionCount = this.transactions.length
        this.transactionCount = 101
        for (let transaction of this.transactions) {
          transaction.date = new Date(transaction.date); //Macht aus einem "Datum" ein Datum!
          transaction.date.setHours(0, 0, 0, 0); //Setzt die Zeit im Datum aus Mitternacht (00:00:00:00)
          let time = transaction.date.getTime() //erstelle einen Unix Zeitstempel time
          if (this.showIncome && transaction.value > 0 || this.showExpense && transaction.value < 0) {
            if (this.Map.has(time)) {
              this.Map.set(time, [...this.Map.get(time)!, transaction]);
            } else {
              this.Map.set(time, [transaction]);
            }
          }
        }
      if (this.Map.size === 0) {
        this.messageService.notifyUser("Keine Transaktionen gefunden.")
      }

      const newest = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
      }

      const oldest = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
        return a.key < b.key ? -1 : (b.key < a.key ? 1 : 0);
      }

      switch (this.sortOrder) {
        case "newest": {
          this.order = newest
          break;
        }
        case "oldest": {
          this.order = oldest
          break;
        }
        default: {
          this.messageService.notifyUserError()
          break;
        }
      }


      this.userService.getUser(this.userId).subscribe(result => {
        this.user = result
        this.currentValue = this.user.currentAmount
      })
      this.isLoaded = true
    });
  }

  deleteTransaction(id: string, userId: string, transactionValue: number) {
    if (!confirm("Transaktion wirklich löschen?")) return;
    (this.transactionService.deleteTransaction(id, true) as Observable<any>).subscribe(_ => {
      if (userId) {
        this.userService.getUser(userId).subscribe(result => {
          this.user = result
          let updatedUser: User = {
            id: this.user?.id!,
            currentAmount: this.user.currentAmount - transactionValue,
            friendlyName: this.user?.friendlyName!
          }
          this.userService.updateUser(updatedUser).subscribe(_ => {
            this.messageService.notifyUser(`Transaktion "${id}" erfolgreich gelöscht`);
            this.updateTransactions();
          })
        });
      }
    })
  }

  editTransaction(transaction: Transaction) {

    this.dialogConfig.data = {

      transaction: transaction,
      title: "Transaktion bearbeiten",
      userId: this.userId
    };
    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);
    dialog.afterClosed().subscribe(input => {
      this.messageService.setTitle(`Übersicht - ${this.friendlyName}`)
      if (input) {
        this.transactionService.updateTransaction(input).subscribe(transactionResult => {
          this.userService.getUser(this.userId).subscribe(result => {
            this.user = result
            let updatedUser: User = {
              id: this.user?.id!,
              currentAmount: this.user.currentAmount - (transaction.value) + (input.value),
              friendlyName: this.user?.friendlyName!
            }
            this.userService.updateUser(updatedUser).subscribe(_ => {
              this.messageService.notifyUser(`Transaktion "${transactionResult.title}" erfolgreich geändert`);
              this.updateTransactions();
            })
          });
        })
      }
    })
  }

  addTransaction() {
    this.dialogConfig.data = {
      title: "Neue Transaktion",
      userId: this.userId
    }
    const dialog = this.dialogRef.open(TransactionDialogComponent, this.dialogConfig);
    dialog.afterClosed().subscribe(input => {
      this.messageService.setTitle(`Übersicht - ${this.friendlyName}`)
      if (input) {
        this.transactionService.createTransaction(input).subscribe(transactionResult => {

          this.userService.getUser(this.userId).subscribe(result => {
            this.user = result
            let updatedUser: User = {
              id: this.user?.id!,
              currentAmount: this.user.currentAmount + (input.value),
              friendlyName: this.user?.friendlyName!
            }
            this.userService.updateUser(updatedUser).subscribe(_ => {
              this.messageService.notifyUser(`Transaktion "${transactionResult.title}" erfolgreich gespeichert`);
              this.updateTransactions();
            })
          })
        })
      }
    })
  }

  uploadInvoice(event: any, transaction: Transaction) {
    if (!(event.target.files && event.target.files.length)) return;

    const reader = new FileReader();

    const [file] = event.target.files;
    const type = file.type;

    reader.readAsDataURL(file);
    this.isLoaded = false
    reader.onload = () => {
      let result = (reader.result as string).replace(`data:${type};base64,`, '');
      const invoice: Invoice = {
        id: transaction.invoice?.id,
        mimeType: type,
        data: result,
        fileName: file.name
      };

      const observable = transaction.invoiceLink ?
        this.invoiceService.updateInvoice(invoice) :
        this.invoiceService.createInvoice(transaction.id, invoice);

      observable.subscribe(_ => {
        this.isLoaded = true
        this.updateTransactions()
      }
    );

    }
  }

  deleteInvoice(transaction: Transaction) {
    if (!transaction.invoiceLink) return;

    if (!confirm("Rechnung wirklich löschen?")) return;
    this.isLoaded = false
    this.invoiceService.deleteInvoice(transaction.invoice!.id!, transaction.id).subscribe(_ => {
      this.isLoaded = true
      this.updateTransactions()});
  }

}
