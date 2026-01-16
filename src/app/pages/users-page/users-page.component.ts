import { Component, OnInit } from "@angular/core";
import users from "data/db.json";

@Component({
  selector: "foodorb-users-page",
  templateUrl: "./users-page.component.html",
  styleUrls: ["./users-page.component.scss"]
})
export class UsersPageComponent implements OnInit {
  userList = users;

  constructor() {
    console.log(users);
  }

  ngOnInit(): void {}
}
