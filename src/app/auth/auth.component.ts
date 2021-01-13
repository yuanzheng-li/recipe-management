import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.services";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let authObservable: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObservable = this.authService.login(form.value);
    } else {
      authObservable = this.authService.signUp(form.value);
    }

    authObservable.subscribe((res) => {
        console.log(res);
        this.isLoading = false;
      }, (errorMessage) => {
        this.openSnackBar(errorMessage);
        this.isLoading = false;
      })

    form.reset();
  }

  private openSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
