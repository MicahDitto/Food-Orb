import { Component } from '@angular/core';

@Component({
  selector: 'foodorb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  model = {
    email: ''
  };

  message = '';
  isSuccess = false;

  findEmail(email: string): void {
    if (!email || !email.includes('@')) {
      this.message = 'Please enter a valid email address.';
      this.isSuccess = false;
      return;
    }

    // In a real app, this would call an API endpoint
    // For this mock implementation, just show a success message
    this.message = `If an account exists for ${email}, a password reset link has been sent.`;
    this.isSuccess = true;
    this.model.email = '';
  }
}
