import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodorb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  show() {
    document.getElementById("dropdown-menu").classList.toggle("show");
  }
  
  logIn() {
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
  }


}
