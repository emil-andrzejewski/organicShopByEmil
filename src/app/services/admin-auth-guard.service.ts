import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { app } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$
    .pipe(switchMap(
      user => this.userService.get(user.uid).valueChanges()
    ))
    .pipe(map(
      appUser => appUser.isAdmin
    ));
  }
}
