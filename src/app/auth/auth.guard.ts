import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      // first we make sure that we always take the user info once and then unsubscribe or at least not listening to the each emit of user changes for memory performance
      take(1),
      map(user => {
        // keep in mine user initially returns null for not set user
        const isAuthenticated = !!user;

        // if user is authenticated to visit this route
        if (isAuthenticated) {
          return true;
        }

        // else navigate to another route with urlTree
        return this.router.createUrlTree(['/auth']);
      })
      // old alternative for createUrlTree
      //   tap(isAuthenticated => {
      //       if (!isAuthenticated) {
      //          this.router.navigate(['/auth']);
      //       }
      //   })
    );
  }
}
