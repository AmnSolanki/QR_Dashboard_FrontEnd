import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../transactions/transaction-service';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
 transactionList = false;
  transactions: Transaction[] = [];
  loading = false;
pageTitle = 'Dashboard';
  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.navigateToDashboard();
  }


  navigateToDashboard() {
    this.transactionList = false;
    this.pageTitle = 'Dashboard';
  }

  navigateToTransactionList() {
    this.transactionList = true;
    this.loadTransactions();
    this.pageTitle = 'Transactions';
  }

  navigateToMachinesList() {
    this.transactionList = false;
    this.pageTitle = 'Machines';

  }

  loadTransactions() {
    this.loading = true;

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
        this.transactionList = true;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['']);
  }

}
