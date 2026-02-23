import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe(res => {
      if (res?.token) {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid email or password';
      }
      this.loading = false;
    });
  }
}