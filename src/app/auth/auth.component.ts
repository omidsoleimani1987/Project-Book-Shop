import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthService, AuthResponseData } from './auth.service';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

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
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      authenticationObservable = this.authService.signup(email, password);
    }

    // authenticationObservable.subscribe(
    //   responseData => {

    //     this.router.navigate(['/recipes']);
    //     this.isLoading = false;
    //   },
    //   ErrorMessage => {
    //     this.error = ErrorMessage;
    //     this.isLoading = false;
    //   }
    // );

    authForm.reset();
  }

  onHandleError(): void {
    this.error = null;
  }
}
