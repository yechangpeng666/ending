import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


function userNameValidator(control: FormControl): { [s: string]: boolean } {

  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent {



  myForm: FormGroup;

  userName: AbstractControl;
  password: AbstractControl;
  authSerive: AuthService;
  baseUrl = "http://127.0.0.1:8080/";
  constructor(private fb: FormBuilder, as: AuthService, private httpClient: HttpClient, private router: Router) {
    this.authSerive = as;
    as.login();
    this.myForm = this.fb.group({
      'userName': ["aaa", Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password']

  }
  onSubmit(value: any) {
    console.log(value)
  }
  login() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'Account',
      this.myForm.value).subscribe(
        (val: any) => {
          console.log(val);
          if (val.succ) {
            this.authSerive.login();
            this.router.navigate(['/management']);
          }
        });
  }
}
