import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        if (!authState.user) {
          return this.router.createUrlTree(['/auth']);
        }
        return !!authState.user;
      })
    );
  }
}
