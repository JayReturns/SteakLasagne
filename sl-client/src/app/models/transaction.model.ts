import {Invoice} from "./invoice.model";

export interface Transaction {
  id: string;
  title: string;
  category: string;
  notice: string;
  value: number;
  date: Date;
  invoice?: Invoice;
  invoiceLink?: string;
  userId: string;
}
