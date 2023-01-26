import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userDetails: any = [];
  submitted = false;
  showPassword: boolean = false;
  roles: any = [
    { id: 0, name: 'choose ur role', value: 'choose' },
    { id: 1, name: 'Admin', value: 'Admin' },
    // { id: 2, name: 'Agent', value: 'Agent' },
  ];
  constructor(
    public router: Router,
    private formBuilder: FormBuilder, // public toastr: ToastrService,
    public _authService: AuthService // public spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
          ),
          Validators.minLength(8),
        ],
      ],
      role: ['', Validators.required],
    });
  }

  signup() {
    
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.signupForm.value, 'form value');

      if (this.signupForm.value.role == 'Admin')
        this._authService.sessionSetItem('is_role', this.signupForm.value.role);
      this.router.navigate(['/login']);
    } else {
      return;
    }
  }
  onChange(event: any) {}
  get f() {
    return this.signupForm.controls;
  }
  login() {
    this.router.navigate(['/signup']);
  }
  hideShowPassword(e: any) {
    this.showPassword = e.target.checked;
  }}
