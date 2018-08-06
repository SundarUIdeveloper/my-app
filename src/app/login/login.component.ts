import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService) { }

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  submitMessage: String;

  loginSubmit() {
    if (this.username.status === 'INVALID' || this.password.status === 'INVALID') {
      this.submitMessage = 'Username/Password invalid';
    } else {
      this.authenticationService.authenticateUser({ username: this.username.value, password: this.password.value })
        .subscribe(data => {
          this.authenticationService.setBearerToken(data.token);
          this.routerService.routeToDashboard();
        }, err => {
          this.handleError(err);
        });
    }
  }

  private handleError(err) {
    if (err.status === 404) {
      this.submitMessage = err.message;
    } else {
      this.submitMessage = err.error.message;
    }
  }
}
