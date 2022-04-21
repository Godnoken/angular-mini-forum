import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

import { UserService } from 'src/app/services/user.service';
import { EmailService } from 'src/app/services/validators/email.service';
import { UserNameService } from 'src/app/services/validators/user-name.service';
import { PasswordService } from 'src/app/services/validators/password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public submitted: boolean = false;

  constructor(
    private userService: UserService,
    private userNameValidator: UserNameService,
    private emailValidator: EmailService,
    private passwordValidator: PasswordService,
    private router: Router,
    private socket: Socket
  ) { }

  userForm = new FormGroup({
    userName: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      asyncValidators:
        [this.userNameValidator.validate.bind(this.userNameValidator)],
      updateOn: "blur"
    }),
    email: new FormControl("", {
      validators: [
        Validators.required,
        Validators.email
      ],
      asyncValidators:
        [this.emailValidator.validate.bind(this.emailValidator)],
      updateOn: "blur"
    }),
    password: new FormControl("", {
      validators: [
        Validators.required,
        this.passwordValidator.validateLength,
        this.passwordValidator.validateUpperAndLower,
        this.passwordValidator.validateNumber,
        this.passwordValidator.validateSpecialCharacter
      ], updateOn: "change"
    }),
    confirmPassword: new FormControl("", [
      Validators.required
    ])
  }, {
    validators: this.passwordValidator.validatePasswordMatch,
    updateOn: "blur"
  })

  get userName() { return this.userForm.get("userName") };
  get email() { return this.userForm.get("email") };
  get password() { return this.userForm.get("password") };
  get confirmPassword() { return this.userForm.get("confirmPassword") };

  onSubmit(): void {
    if (this.userForm.valid) {
      this.submitted = true;
      delete this.userForm.value.confirmPassword;

      this.userService.registerUser(this.userForm.value)
        .subscribe(res => {
          this.userService.jwtToken = res.accessToken;
          this.userService.loggedUserId = res.user.id;
          this.userService.user = res.user;
          this.socket.emit('authUserConnected', res.user.userName);
        }
        );

      setTimeout(() => {
        this.userForm.reset();
        this.router.navigateByUrl("/");
      }, 1500)
    }
    else {
      this.submitted = false;
    }
  }
}
