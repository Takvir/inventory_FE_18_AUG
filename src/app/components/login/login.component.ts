import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  branchId: string | null = null;
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.branchId = localStorage.getItem('branch_id');
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Successful login
        this.error = null;
        const userType = localStorage.getItem('user_type');
        const branchId = localStorage.getItem('branch_id');

        console.log('User Type:', userType);
        console.log('Branch ID:', branchId);

        // Determine the route based on user type
        let navigateTo: string;
        if (userType === 'superadmin') {
          navigateTo = '/equipment';
        } else if (userType === 'admin') {
          navigateTo = '/equipment';
        } else if (userType === 'branch') {
          navigateTo = '/equipment';
        } else {
          navigateTo = '/branch-list'; // Fallback route
        }

        // Navigate to the route and reload the page
        this.router.navigate([navigateTo]).then(() => {
          window.location.reload();
        });

      },
      error: (err) => {
        // Failed login
        this.error = 'Invalid credentials';
      }
    });
  }
}
