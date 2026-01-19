import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'foodorb-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  model = {
    email: "",
    password: ""
  }

  errorMessage = '';
  isLoading = false;

  constructor(
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    this.user.login(this.model).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    });
  }
}
