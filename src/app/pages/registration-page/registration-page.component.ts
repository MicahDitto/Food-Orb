import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

register() {
    console.log(this.model)
    this.userService.register(this.model)
  }
}
