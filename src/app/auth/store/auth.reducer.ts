import * as fromAuthActions from './auth.action';

import { User } from './../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(
  state: State = initialState,
  action: fromAuthActions.AuthActionTypes
): State {
  switch (action.type) {
    // login case
    case fromAuthActions.LOGIN_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user
      };

    // logout case
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    // default case
    default:
      return state;
  }
}
