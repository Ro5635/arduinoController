import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {UserService} from "../user.service";
import {LoginResourceResponse} from "./LoginResourceResponse";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  // Boolean for deriving if loading UI elements should be shown
  isAwaitingLoginResponse: Boolean = false;
  hadAFailedLogin: Boolean = false;

  constructor(private _formBuilder: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.min(4)]),

    });
  }

  async attemptUserLogin(userEmail: string, userPassword: string) {
    console.log('Attempting login');

    const handleFailedAuthentication = () => {
      this.isAwaitingLoginResponse = false;

      // Reset login form
      this.loginForm.get('emailFormControl').reset();
      this.loginForm.get('passwordFormControl').reset();

      // Notify User
      this.snackBar.open('Incorrect Account Details', 'Login', {
        duration: 4000,
      });

      this.hadAFailedLogin = true;

    };

    try {

      this.isAwaitingLoginResponse = true;

      this.userService.attemptLogin(userEmail, userPassword).subscribe((loginResponse: LoginResourceResponse) => {

        this.isAwaitingLoginResponse = false;

        if (loginResponse.success) {
          this.router.navigate(['/dashboard/select']);
          // Need to route to the dashboard selection page...

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
