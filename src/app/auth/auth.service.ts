import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

// define the response type
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // storing the user as a subject
  // user = new Subject<User>();
  // Behavior Subject some how stores the previous emitted value, so we don't have to subscribe to it when we want a value from previous emit, but we can still subscribe and use it just like normal subject, just it needs a starting value
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(responseError: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An Unknown Error Occurred';

    if (!responseError.error || !responseError.error.error) {
      return throwError(errorMessage);
    }

    switch (responseError.error.error.message) {
      // sign up error cases
      case 'EMAIL_EXISTS':
        errorMessage = 'This email address already exists.';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;

      // login error cases
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;

      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(responseData: AuthResponseData): void {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );

    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );

    // storing the token on the local storage
    localStorage.setItem('userData', JSON.stringify(user));

    this.user.next(user);
  }

  signup(
    userEmail: string,
    userPassword: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true
        },
        {
          params: new HttpParams().set(
            'key',
            'AIzaSyAuz8VDqXqpf3pYsQNsrqezQ2SQwv96t-c'
          )
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(userEmail: string, userPassword: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true
        },
        {
          params: new HttpParams().set(
            'key',
            'AIzaSyAuz8VDqXqpf3pYsQNsrqezQ2SQwv96t-c'
          )
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  // will be implement in app component at the beginning of the loading of the application
  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      this.router.navigate(['/auth']);
      return;
    }

    const LoadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // check if the token is truthy (not expired) - using the getter
    if (LoadedUser.token) {
      this.user.next(LoadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
