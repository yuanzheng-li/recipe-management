import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class AuthModule {}
