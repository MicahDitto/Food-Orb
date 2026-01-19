import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'foodorb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private storage: StorageService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  get loggedIn(): boolean {
    return this.storage.isAuthenticated();
  }

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  logout(): void {
    this.userService.logout();
  }
}
