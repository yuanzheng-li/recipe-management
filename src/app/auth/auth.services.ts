import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

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
  private tokenExpirationTimer: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  signUp({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
  }

  logout() {
    this.user.next(null);

    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    this.recipeService.deleteRecipes();
    this.shoppingListService.deleteIngredients();

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) {
      return;
    }

    const userData = JSON.parse(userDataStr);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expiresDate)
    );

    if (loadedUser) {
      this.user.next(loadedUser);

      const expiresIn =
        new Date(userData._expiresDate).getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth({ email, localId, idToken, expiresIn }: AuthResponseData) {
    const expiresDate = new Date(
      new Date().getTime() + 1000 * parseInt(expiresIn)
    );
    const user = new User(email, localId, idToken, expiresDate);

    localStorage.setItem('userData', JSON.stringify(user));

    this.user.next(user);

    this.autoLogout(1000 * parseInt(expiresIn));
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
