import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    // extra check for form validation
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;

    const email: string = authForm.value.email;
    const password: string = authForm.value.password;

    let authenticationObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authenticationObservable = this.authService.login(email, password);
    } else {
      authenticationObservable = this.authService.signup(email, password);
    }

    authenticationObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
      },
      ErrorMessage => {
        this.error = ErrorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
