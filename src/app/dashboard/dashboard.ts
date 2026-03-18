import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../transactions/transaction-service';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { firstValueFrom } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  displayedColumns: string[] = ['index', 'qr_id', 'amount', 'transactions'];

  dataSource = new MatTableDataSource<any>([]);


  transactionList = false;
  transactions: any ;
  loading = false;
  pageTitle = 'Dashboard';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private cd:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.navigateToDashboard();
      }

  async navigateToDashboard() {
    this.transactionList = false;
    this.pageTitle = 'Dashboard';
   await this.loadTransactions();
  }

  navigateToTransactionList() {
    this.transactionList = true;
    this.pageTitle = 'Transactions';
    this.loadTransactions();
  }

  navigateToMachinesList() {
    this.transactionList = false;
    this.pageTitle = 'Machines';
  }

async loadTransactions(): Promise<void> {
  this.loading = true;

  try {
    const data = await firstValueFrom(this.transactionService.getTransactions());

    console.log('API RESPONSE:', data);

    this.transactions = data;

    // table binding
    this.dataSource.data = data.qr_summary || [];
    this.paginator.length = data.qr_summary?.length || 0;

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      
    });

  } catch (err) {
    console.error('API ERROR:', err);
    // this.transactions = null;
  } finally {
    this.loading = false;
  }
   this.cd.detectChanges();
}

  // filter function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}