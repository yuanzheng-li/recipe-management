import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
    private router: Router) {}

  signUp({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4Upim8VZh49X1CwqzbFKZWr6cnO6OSDc',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4Upim8VZh49X1CwqzbFKZWr6cnO6OSDc',
        {
          email,
          password,
          returnSecurityToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuth({
    email,
    localId,
    idToken,
    expiresIn,
  }: AuthResponseData) {
    const expiresDate = new Date(
      new Date().getTime() + 1000 * parseInt(expiresIn)
    );
    const user = new User(email, localId, idToken, expiresDate);

    this.user.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    switch (error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts!';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Email or password is not correct!';
        break;
      default:
        errorMessage = 'An unknown error happened!';
    }

    return throwError(errorMessage);
  }
}
