import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { IFood } from 'src/app/interfaces/ifood';

@Component({
  selector: 'foodorb-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart: IFood[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getItemsFromCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCart();
  }

  proceedToCheckout(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    this.router.navigateByUrl('/checkout');
  }
}
