import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/validators/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted: boolean = false;

  constructor(
    private auth: AuthenticationService,
    public userService: UserService,
    private router: Router,
    private socket: Socket
  ) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    email: new FormControl("", {
      validators: Validators.required,

    }),
    password: new FormControl("", {
      validators: Validators.required
    })
  }, {
    asyncValidators: this.auth.validateLogin,
    updateOn: "submit"
  })

  onSubmit(): void {
    if (this.authForm.pending) {
      let sub = this.authForm.statusChanges
        .subscribe(() => {
          if (this.authForm.valid) {

            this.userService.loginUser(this.authForm.value)
              .subscribe(res => {
                this.userService.jwtToken = res.accessToken;
                this.userService.loggedUserId = res.user.id;
                this.userService.user = res.user;
                this.submitted = true;
                this.socket.emit('authUserConnected', res.user.userName);
              });

              setTimeout(() => {
                this.authForm.reset();
                this.router.navigateByUrl("/");
              }, 1500)
          }
          sub.unsubscribe();
        });
      }
      else {
        this.submitted = false;
      }
  }
}
