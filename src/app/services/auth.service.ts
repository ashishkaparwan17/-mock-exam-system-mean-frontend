import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TestService } from './test.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.host + '/api';

  constructor(
    private _snackbar: MatSnackBar,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private testService: TestService
  ) {}

  login(loginForm: NgForm) {
    return this.http.post(
      this.url + '/login',
      JSON.stringify(loginForm.value),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
      }
    );
  }

  logout() {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#c8303f',
      cancelButtonColor: '#00b894',
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.hasTestEnded = true;
        localStorage.removeItem('token');
        this._snackbar.open('Successfully logged out', 'Dismiss', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  currentUser() {
    return this.jwtHelper.decodeToken();
  }

  signup(signupForm: NgForm) {
    return this.http.post<{ message: string }>(
      this.url + '/signup',
      JSON.stringify(signupForm.value),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
      }
    );
  }
}
