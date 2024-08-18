// auth.service.ts
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private apiUrl = 'http://11.11.7.41:3000/api/auth/login';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userTypeSubject = new BehaviorSubject<string | null>(null);

  branchId: string | null = null;


  ngOnInit(): void {
    this.branchId = localStorage.getItem('branch_id');
  }
  constructor(private http: HttpClient, private router: Router) {}

  // Get token observable
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Get user type observable
  get userType$(): Observable<string | null> {
    return this.userTypeSubject.asObservable();
  }

  // Log in a user
 // auth.service.ts
// login(username: string, password: string): Observable<any> {
//   return this.http.post<any>(this.apiUrl, { username, password })
//     .pipe(
//       tap(response => {
//         if (response.token) {
//           this.tokenSubject.next(response.token);
//           this.userTypeSubject.next(response.user_type);
//           localStorage.setItem('token', response.token);
//           this.router.navigate(['/equipment']);
//         } else {
//           this.tokenSubject.next(null);
//           this.userTypeSubject.next(null);
//         }
//       }),
//       catchError(error => {
//         console.error('Login error:', error); // Log the error
//         this.tokenSubject.next(null);
//         this.userTypeSubject.next(null);
//         return throwError(error);
//       })
//     );
// }

// auth.service.ts
// auth.service.ts
// auth.service.ts
login(username: string, password: string): Observable<any> {
  return this.http.post<any>(this.apiUrl, { username, password })
    .pipe(
      tap(response => {
        console.log('Login response:', response); // Debug logging
        if (response.token) {
          this.tokenSubject.next(response.token);
          this.userTypeSubject.next(response.user_type);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('branch_id', response.branch_id); // Store branch ID
        } else {
          this.tokenSubject.next(null);
          this.userTypeSubject.next(null);
        }
      }),
      catchError(error => {
        console.error('Login error:', error); // Log the error
        this.tokenSubject.next(null);
        this.userTypeSubject.next(null);
        return throwError(error);
      })
    );
}



  // Log out a user
  logout(): void {
    this.tokenSubject.next(null);
    this.userTypeSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  // Check if the user is authenticated
  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }
}
