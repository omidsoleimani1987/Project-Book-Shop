import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
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
  private tokenExpirationTimer: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  // will be implement in app component at the beginning of the loading of the application
  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      // this.router.navigate(['/auth']); ---  instead we use route guard
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
      // activating the auto logout
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);

      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: LoadedUser.email,
          userId: LoadedUser.id,
          token: LoadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());

    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
