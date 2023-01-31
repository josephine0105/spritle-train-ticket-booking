import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userDetails: any = [];
  submitted = false;
  showPassword: boolean = false;
  role: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public _authService: AuthService
  ) {}

  ngOnInit(): void {
    // if (this._service.isAuthenticated()) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/']);
    // }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      console.log(this.loginForm.value);

      // this.router.navigate(['/']);
      this.loginForm.reset();
      this.role = localStorage.getItem('is_role');
      console.log(this.role)
      if (this.role == 'Admin') {
        this.router.navigate(['/seat']);
      } else {
        this.router.navigate(['/profile']);
      }
    } else {
      return;
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  signup() {
    this.router.navigate(['/signup']);
  }
  hideShowPassword(e: any) {
    this.showPassword = e.target.checked;
  }
}
