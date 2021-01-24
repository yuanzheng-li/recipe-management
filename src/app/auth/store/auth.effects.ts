import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AppState } from 'src/app/store/app.reducer';

import { environment } from 'src/environments/environment';
import { AuthResponseData, AuthService } from '../auth.services';
import { User } from '../user.model';
import {
  AuthFail,
  AuthSuccess,
  AUTH_SUCCESS,
  AUTO_LOGIN,
  LoginStart,
  LOGIN_START,
  LOGOUT,
  SignupStart,
  SIGNUP_START,
} from './auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  loginStart = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authAction: LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {
            email: authAction.payload.email,
            password: authAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((authData) => this.handleAuth(authData)),
          catchError((error) => this.handleError(error))
        );
    })
  );

  @Effect()
  signupStart = this.actions$.pipe(
    ofType<SignupStart>(SIGNUP_START),
    switchMap((authAction) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          {
            email: authAction.payload.email,
            password: authAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((authData) => this.handleAuth(authData)),
          catchError((error) => this.handleError(error))
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      const userData = this.dataStorageService.getUserDataInLocalStorage();

      if (!userData) {
        return {
          type: 'DUMMY_ACTION',
        };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._expiresDate)
      );

      if (loadedUser) {
        const expiresIn =
          new Date(userData._expiresDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expiresIn);

        return new AuthSuccess(loadedUser);
      }

      return {
        type: 'DUMMY_ACTION',
      };
    })
  );

  @Effect({
    dispatch: false,
  })
  authSuccess = this.actions$.pipe(
    ofType(AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  @Effect({
    dispatch: false,
  })
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.store.dispatch(new RecipeActions.DeleteRecipes());
      this.store.dispatch(new ShoppingListActions.DeleteIngredients());
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  private handleAuth({ email, localId, idToken, expiresIn }: AuthResponseData) {
    const expiresDate = new Date(
      new Date().getTime() + 1000 * parseInt(expiresIn)
    );
    const user = new User(email, localId, idToken, expiresDate);

    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(1000 * parseInt(expiresIn));

    return new AuthSuccess(user);
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

    return of(new AuthFail(errorMessage));
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}
}
