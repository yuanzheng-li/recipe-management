import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../store/app.reducer';
import { LoginStart, SignupStart } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  authSubscription!: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.authSubscription = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isLoading;
      if(authState.errorMsg) {
        this.openSnackBar(authState.errorMsg);
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(this.isLoginMode) {
      this.store.dispatch(new LoginStart(form.value));
    } else {
      this.store.dispatch(new SignupStart(form.value));
    }

    form.reset();
  }

  private openSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
