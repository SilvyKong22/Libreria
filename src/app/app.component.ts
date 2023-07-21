import { Component, OnInit } from '@angular/core';
import { LoginService } from './core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.loginService.stateLogin$.subscribe((isLogin) => {
      if (isLogin) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
