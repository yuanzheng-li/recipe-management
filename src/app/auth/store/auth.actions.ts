import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: User) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | LoginStart
  | AuthSuccess
  | AuthFail
  | SignupStart
  | Logout
  | AutoLogin;
