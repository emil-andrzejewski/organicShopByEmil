import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
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
}
