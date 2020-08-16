import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import * as firebase from "firebase";
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  isLogged: boolean = false;
  sub: Subscription;
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private router: Router  
  ) { 
    this.sub = this.auth.appUser$.subscribe(user => 
    {
      this.appUser = user;
    });
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

}
