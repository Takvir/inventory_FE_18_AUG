import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'inventory_fe';

  reportOpen = false;
  navOpen = false;

  isLoginPage = false;
  userType: string | null = null;
  branchId: string | null = null;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    // Initialize userType and branchId from local storage
    
   
    this.userType = localStorage.getItem('user_type');
    this.branchId = localStorage.getItem('branch_id');

    // Check the current route to determine if it's the login page
   

 

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/sign-in';
      }
    });
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  toggleReport() {
    this.reportOpen = !this.reportOpen;
  }

  signOut() {
    localStorage.clear(); // Clear local storage on sign out
    this.router.navigate(['/sign-in']);
  }
}
