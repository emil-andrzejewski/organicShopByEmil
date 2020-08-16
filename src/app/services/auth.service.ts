import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnURL = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnURL);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut().then(()=> {
      this.router.navigateByUrl('/');  
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(
      user => {
        if(user) return this.userService.get(user.uid).valueChanges();
        else return of(null);
      }
    ));
  }
}
