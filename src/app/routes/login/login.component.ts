import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  hide = true;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {}

  verifyLogin() {
    this.loginForm.patchValue({
      ...this.loginForm.value,
    });

    const request = this.loginForm.getRawValue();
    this.loginService.login(request).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('hai sbagliato credenziali');
      },
    });
  }
}
