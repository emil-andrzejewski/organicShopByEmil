import { ShoppingCartFirebase } from '../models/shopping-cart-firebase';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  sub: Subscription;
  appUser: AppUser;
  cart$: Observable<ShoppingCartFirebase>;
  isExpanded: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) { 
    this.sub = this.auth.appUser$.subscribe(user => 
    {
      this.appUser = user;
    });
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }



}
