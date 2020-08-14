import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  isLogged: boolean = false;
  user: firebase.User;
  username: string;
  subs: Subscription[];
  sub: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router  
  ) { 
    this.sub = this.afAuth.authState.subscribe(user => 
    {
      this.user = user;
      if(user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.afAuth.signOut();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

}
