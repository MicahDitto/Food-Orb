import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
// import { users } from "data/db.json";

@Component({
  selector: 'foodorb-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
//  users: IUser[] = [];

 
  constructor( ) {
    userList: users
    console.log(users)
   }
userList = users
  ngOnInit(): void {
  }

}
