import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Email and Password required';
      return;
    }

    // TEMP login (no backend)
    if (this.loginData.email === 'admin@test.com' && this.loginData.password === '1234') {
      localStorage.setItem('token', 'dummy-token');
      this.router.navigate(['dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
