import { Injectable } from "@angular/core"
import { AbstractControl, FormGroup } from '@angular/forms';


@Injectable()
export class AuthService {
    myForm: FormGroup;
    userName: AbstractControl;
    password: AbstractControl;
    isLoggedIn = false;
    login() {


        this.isLoggedIn = true;
    }
    logout() {
        this.isLoggedIn = false;
    }
    loggedIn() {
        return this.isLoggedIn
    }
}