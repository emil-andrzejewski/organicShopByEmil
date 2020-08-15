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
  user: firebase.User;
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router  
  ) { 
    this.sub = this.auth.user$.subscribe(user => 
    {
      this.user = user;
      // if(user) router.navigate(['/']); 
      // else router.navigate(['/login']); 
    });
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

}
