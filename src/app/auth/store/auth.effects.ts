import { Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.action';

export class AuthEffects {
  authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START));

  constructor(public actions$: Actions) {}
}
