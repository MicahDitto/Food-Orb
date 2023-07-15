import { Component, OnInit } from '@angular/core';
import users } from "data/db.json";
import { IFood } from 'src/app/interfaces/ifood';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'foodorb-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

cart = this.cartService.getItemsFromCart();

user = {
  address: "101 Placeholder Rd"
}

  constructor(
    private cartService: CartService
  ) { 
    userList: users
  }
// cart = users.find("id").cart ??
// user = users.find("id")  ??

  ngOnInit(): void {
  }

  createOrder() {

  }
}
