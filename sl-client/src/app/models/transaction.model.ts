export interface Transaction {
  id: string;
  title: string;
  category: string;
  notice: string;
  value: number;
  date: Date;
  userId: string;
}
