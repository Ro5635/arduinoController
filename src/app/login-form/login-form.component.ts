import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {LoginResourceResponse} from "./LoginResourceResponse";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  // Boolean for deriving if loading UI elements should be shown
  isAwaitingLoginResponse: Boolean = false;

  constructor(private _formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.min(4)]),

    });
  }

  async attemptUserLogin(userEmail: String, userPassword: String) {
    console.log('Attempting login');

    const handleFailedAuthentication = () => {
      this.isAwaitingLoginResponse = false;

    };

    try {

      this.isAwaitingLoginResponse = true;

      this.userService.attemptLogin(userEmail, userPassword).subscribe((loginResponse: LoginResourceResponse) => {

        this.isAwaitingLoginResponse = false;

        if (loginResponse.success) {
          alert('YAY');

        } else {
          //  Login Failure
          handleFailedAuthentication();

        }
      });


    } catch (err) {
      //  Login Failure
      handleFailedAuthentication();

    }


  }

}
