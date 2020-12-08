import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
  }
}
