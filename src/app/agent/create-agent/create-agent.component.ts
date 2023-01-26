import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss'],
})
export class CreateAgentComponent implements OnInit {
  agentForm!: FormGroup;
  userDetails: any = [];
  submitted = false;
  showPassword: boolean = false;
  roles: any = [
    { id: 0, name: 'choose ur role', value: 'choose' },
    // { id: 1, name: 'Admin', value: 'Admin' },
    { id: 1, name: 'Agent', value: 'Agent' },
  ];
  constructor(
    public router: Router,
    private formBuilder: FormBuilder, // public toastr: ToastrService,
    public _authService: AuthService // public spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.agentForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
        ),
      ]),
      role: new FormControl(null, Validators.required),
      upload: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      path: new FormControl('http://localhost:4200/login'),
    });
  }

  signup() {
    this.submitted = true;
    if (this.agentForm.valid) {
      console.log(this.agentForm.value, 'form value');

      if (this.agentForm.value.role == 'Agent')
        this._authService.sessionSetItem('is_role', this.agentForm.value.role);

      const form = document.getElementById('agentForm') as HTMLFormElement;
      emailjs
        .sendForm(
          'service_848wdji',
          'template_kkudmz2',
          form,
          'ntepM7CrV5eCKh17s'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
            if (result.text == 'OK') {
              this.router.navigate(['/login']);
              this._authService.sessionSetItem(
                'currentUser',
                JSON.stringify(this.agentForm.value)
              );
              this._authService.sessionSetItem(
                'userId',
                JSON.stringify(this.agentForm.value.email)
              );
              this._authService.sessionSetItem(
                'password',
                JSON.stringify(this.agentForm.value.password)
              );
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      return;
    }
  }
  onChange(event: any) {}
  get f() {
    return this.agentForm.controls;
  }
  login() {
    this.router.navigate(['/signup']);
  }
  hideShowPassword(e: any) {
    this.showPassword = e.target.checked;
  }
  onFileSelect(event: any) {
    //   console.log(event,event.target.files,"event")
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   console.log(file,"event")
    //   this.userForm.get('upload')?.setValue(file);
    //   // console.log(this.userForm.get('upload')?.setValue(file), 'set');
    //   // console.log(this.userForm.get('upload')?.value, 'get');
    // }
  }
}
