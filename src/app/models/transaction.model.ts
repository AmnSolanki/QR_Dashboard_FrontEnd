export interface Transaction {
  id: number;
  transaction_id: string;
  qr_id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}