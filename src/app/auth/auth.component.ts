import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

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

    if (this.isLoginMode) {
      // .send login request
    } else {
      this.authService.signup(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.isLoading = false;
        },
        ErrorMessage => {
          this.error = ErrorMessage;
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
  }
}
