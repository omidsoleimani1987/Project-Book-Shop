import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// define the response type
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
        catchError(responseError => {
          let errorMessage = 'An Unknown Error Occurred';

          if (!responseError.error || !responseError.error.error) {
            return throwError(errorMessage);
          }

          switch (responseError.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email address already exists!';

            // case 'OPERATION_NOT_ALLOWED':
            // errorMessage = 'Password sign-in is disabled for this project';
          }

          return throwError(errorMessage);
        })
      );
  }
}
