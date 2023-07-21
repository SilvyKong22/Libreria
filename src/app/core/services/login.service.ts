import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthRequest } from '../dto/auth_request.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  stateLogin$ = new BehaviorSubject<boolean>(false);
  userProfile$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.userProfile$.next(
        JSON.parse(atob(localStorage.getItem('token')?.split('.')[1]!))
      );

      this.stateLogin$.next(true);
    } else {
      this.stateLogin$.next(false);
    }
  }

  login(request: AuthRequest) {
    return this.http
      .post<AuthRequest>(`${environment.BASE_URL_LOGIN}/authenticate`, request)
      .pipe(
        tap((response: any) => {
          if (response && response.id_token) {
            localStorage.setItem('token', response.id_token);
            this.userProfile$.next(
              JSON.parse(atob(localStorage.getItem('token')?.split('.')[1]!))
            );
            this.stateLogin$.next(true);
          }
        })
      );
  }

  logout() {
    this.stateLogin$.next(false);
    this.userProfile$.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
