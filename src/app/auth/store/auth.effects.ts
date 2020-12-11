import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../../environments/environment';
import * as AuthActions from './auth.action';
import { User } from './../user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// adding  helper functions
const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate
  });
};

const handleError = (responseError: any) => {
  let errorMessage = 'An Unknown Error Occurred';

  if (!responseError.error || !responseError.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (responseError.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;

    case 'INVALID_PASSWORD':
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;

    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;

    case 'EMAIL_EXISTS':
      errorMessage = 'This email address already exists.';
      break;

    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;

    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage =
        'We have blocked all requests from this device due to unusual activity. Try again later.';
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
          {
            params: new HttpParams().set('key', environment.fireBaseAPIKey)
          }
        )
        .pipe(
          map(responseData =>
            handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            )
          ),
          catchError(responseError => handleError(responseError))
        );
    })
  );

  // redirect effect
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  // sign up
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          },
          {
            params: new HttpParams().set('key', environment.fireBaseAPIKey)
          }
        )
        .pipe(
          map(responseData =>
            handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            )
          ),
          catchError(responseError => handleError(responseError))
        );
    })
  );

  // logout
  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    })
  );

  // auto login
  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'dummy' };
      }

      const LoadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (LoadedUser.token) {
        return new AuthActions.AuthenticateSuccess({
          email: LoadedUser.email,
          userId: LoadedUser.id,
          token: LoadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }

      return { type: 'dummy' };
    })
  );

  constructor(
    public actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
