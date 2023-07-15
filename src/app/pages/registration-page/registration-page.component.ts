import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompareValidator } from 'src/app/validators/compare';
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


  // registerForm = new FormGroup({
  //   fullName: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
  //   email: new FormControl("", [Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required,]), // Validators.pattern(" ") for proper email validation.
  //   password: new FormControl("", [Validators.required, Validators.minLength(6)]),   //Validators.minlength(6) Validators.maxlength(15)
  //   confirmPassword: new FormControl("")
  // }, { validators: [CompareValidator("password", "confirmPassword")]
  // })
  
  // user = {
  //   name: this.registerForm.value.name,
  //   email: this.registerForm.value.email,
  //   password: this.registerForm.
  // }
//   
//   get fullName() {
//     return this.registerForm.get("fullName");
//   }
//   get email() {
//     return this.registerForm.get("email");
//   }
//   get password() {
//     return this.registerForm.get("password");
//   }
//   get confirmPassword() {
//     return this.registerForm.get("confirmPassword");
//   }

