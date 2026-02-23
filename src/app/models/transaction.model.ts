export interface Transaction {
  id: number;
  user: string;
  status: 'Completed' | 'Pending' | 'Failed';
  amount: number;
  machine: string;
}