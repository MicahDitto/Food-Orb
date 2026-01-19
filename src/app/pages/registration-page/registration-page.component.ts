import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'foodorb-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  model = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.userService.register(this.model).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400 && err.error === 'Email already exists') {
          this.errorMessage = 'An account with this email already exists.';
        } else {
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      }
    });
  }
}
