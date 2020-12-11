import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import * as AuthActions from './auth.action';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

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
          catchError(error => {
            // ....
            of();
          }),
          map(responseData => {
            of();
          })
        );
    })
  );

  constructor(public actions$: Actions, private http: HttpClient) {}
}
