import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  transactionList=false;

  constructor(private router:Router) {}
  ngOnInit() {
  this.transactionList=false;

  }

  logOut()
  {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  navigateToTransactionList()
  {
    this.transactionList=true;
  }
  navigateToMachinesList()
  {
    this.transactionList=false;
  }
  navigateToDashboard()
  {
    this.transactionList=false;

  }

}
