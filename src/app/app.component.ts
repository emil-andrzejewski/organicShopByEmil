import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService
  ) {
    auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);

        router.navigateByUrl(localStorage.getItem('returnUrl'));
      } 
      router.navigateByUrl('/admin/products/new'); //do testów
    })
  }
}
