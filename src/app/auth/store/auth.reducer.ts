import { User } from '../user.model';
import {
  AuthActions,
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOGIN_START,
  LOGOUT,
  SIGNUP_START,
} from './auth.actions';

export interface State {
  isLoading: boolean;
  user: User | null;
  errorMsg: string;
}

const initialState: State = {
  isLoading: false,
  user: null,
  errorMsg: '',
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        isLoading: true,
        user: null,
        errorMsg: '',
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        errorMsg: '',
      };
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        errorMsg: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        user: null,
        errorMsg: '',
      };
    default:
      return state;
  }
}
