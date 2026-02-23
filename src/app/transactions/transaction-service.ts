import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
private transactions: Transaction[] = [
    {
      id: 1,
      user: 'Rahul',
      status: 'Completed',
      amount: 1200,
      machine: 'HP ScanJet Pro'
    },
    {
      id: 2,
      user: 'Anita',
      status: 'Pending',
      amount: 800,
      machine: 'Epson WorkForce Scanner'
    },
    {
      id: 3,
      user: 'John',
      status: 'Failed',
      amount: 500,
      machine: 'Canon imageFORMULA'
    }
  ];

  // Fake async API
  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }
}
