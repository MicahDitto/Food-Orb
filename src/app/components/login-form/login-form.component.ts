import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../header/header.component';

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

  header: HeaderComponent;
  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model)
    this.user.login(this.model)
    // this.header.logIn();
    }

}
