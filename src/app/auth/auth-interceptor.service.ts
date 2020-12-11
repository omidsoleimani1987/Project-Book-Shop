import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // we just want to use this approach for storeRecipes request in data-storage service
    // so we check first which url we send the request to
    // because interceptors will be attached to ALL out going requests

    if (
      request.url ===
      'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json'
    ) {
      return this.store.select('auth').pipe(
        take(1),
        map(authState => authState.user),
        exhaustMap(user => {
          const modifiedRequest = request.clone({
            params: new HttpParams().set('auth', user.token)
          });

          return next.handle(modifiedRequest);
        })
      );
    }

    return next.handle(request);
  }
}
