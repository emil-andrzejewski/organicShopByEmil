import { AuthService } from './../services/auth.service';
import { Component, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

  login(){
    this.auth.login();
    this.sub = this.auth.user$.subscribe(user => {
      if(user) this.router.navigate(['/']);
    })
  }

  // checkIfIsLogged(){
  //   this.afAuth.authState.subscribe(user=> {
  //     this.user = user;
  //   });
  //   if(this.user) {
  //     console.log(this.user);
  //   }
  // }
}
