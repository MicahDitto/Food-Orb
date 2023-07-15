import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'foodorb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  model =  {
    email: ""
  }

  constructor( private user: UserService) { }

  ngOnInit(): void {
  }

  findEmail(searchEmail) {
    // this.user.
    // return;
  }

  // get email() {
  //   // return this.form.email;
  // }

}
