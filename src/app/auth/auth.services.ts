import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp({email, password}: {email: string, password: string}) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4Upim8VZh49X1CwqzbFKZWr6cnO6OSDc',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError));
  }

  login({email, password}: {email: string; password: string}) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4Upim8VZh49X1CwqzbFKZWr6cnO6OSDc',
      {
        email,
        password,
        returnSecurityToken: true
      }
    ).pipe(catchError(this.handleError));
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
