import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  createOrder() {}
}
