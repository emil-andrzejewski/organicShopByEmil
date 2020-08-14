import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  @Output('isLogged') isLogged: boolean = false;
  user;

  constructor(private afAuth: AngularFireAuth) { }

  login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.isLogged = true;
  }

  checkIfIsLogged(){
    this.afAuth.authState.subscribe(user=> {
      this.user = user;
    });
    if(this.user) {
      console.log(this.user);
    }
  }
}
