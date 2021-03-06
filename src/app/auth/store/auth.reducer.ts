import * as fromAuthActions from './auth.action';

import { User } from './../user.model';

export interface State {
  user: User;
  loading: boolean;
  authError: string;
}

const initialState: State = {
  user: null,
  loading: false,
  authError: null
};

export function authReducer(
  state: State = initialState,
  action: fromAuthActions.AuthActionTypes
): State {
  switch (action.type) {
    // authenticate success
    case fromAuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        loading: false,
        authError: null
      };

    // logout case
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    // start logging in
    case fromAuthActions.LOGIN_START:
    case fromAuthActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
        authError: null
      };

    // authenticate fail
    case fromAuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };

    // clear error
    case fromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    // default case
    default:
      return state;
  }
}
