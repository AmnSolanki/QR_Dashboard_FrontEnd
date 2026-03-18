import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
private apiUrl = 'http://127.0.0.1:8000/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/summary`);
  }
}
