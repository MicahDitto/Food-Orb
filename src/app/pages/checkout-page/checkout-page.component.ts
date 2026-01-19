import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFood } from 'src/app/interfaces/ifood';
import { IOrderAddress, IOrderPayment } from 'src/app/interfaces/iorder';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserProfileService, UserAddress, UserPayment } from 'src/app/services/user-profile.service';

@Component({
  selector: 'foodorb-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  cart: IFood[] = [];
  addresses: UserAddress[] = [];
  payments: UserPayment[] = [];
  selectedAddress: UserAddress | null = null;
  selectedPayment: UserPayment | null = null;
  showAddAddress = false;
  showAddPayment = false;
  isLoading = false;

  newAddress: UserAddress = { name: '', address: '', city: '', state: '', zip: '' };
  newPayment = { name: '', card: '', date: '', cvc: '' };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getItemsFromCart();
    if (this.cart.length === 0) {
      this.router.navigateByUrl('/cart');
      return;
    }
    this.loadUserData();
  }

  loadUserData(): void {
    // Load from localStorage via UserProfileService
    this.addresses = this.userProfileService.getAddresses();
    this.payments = this.userProfileService.getPayments();

    // Auto-select first address and payment if available
    if (this.addresses.length > 0) {
      this.selectedAddress = this.addresses[0];
    }
    if (this.payments.length > 0) {
      this.selectedPayment = this.payments[0];
    }
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  selectAddress(address: UserAddress): void {
    this.selectedAddress = address;
  }

  selectPayment(payment: UserPayment): void {
    this.selectedPayment = payment;
  }

  toggleAddAddress(): void {
    this.showAddAddress = !this.showAddAddress;
    if (this.showAddAddress) {
      this.newAddress = { name: '', address: '', city: '', state: '', zip: '' };
    }
  }

  toggleAddPayment(): void {
    this.showAddPayment = !this.showAddPayment;
    if (this.showAddPayment) {
      this.newPayment = { name: '', card: '', date: '', cvc: '' };
    }
  }

  addNewAddress(): void {
    if (this.newAddress.name && this.newAddress.address && this.newAddress.city &&
        this.newAddress.state && this.newAddress.zip) {
      // Save to localStorage
      this.userProfileService.addAddress(this.newAddress);
      // Reload addresses
      this.addresses = this.userProfileService.getAddresses();
      this.selectedAddress = this.addresses[this.addresses.length - 1];
      this.showAddAddress = false;
      this.newAddress = { name: '', address: '', city: '', state: '', zip: '' };
    }
  }

  addNewPayment(): void {
    if (this.newPayment.name && this.newPayment.card && this.newPayment.date) {
      // Save to localStorage (card will be masked by the service)
      this.userProfileService.addPayment({
        name: this.newPayment.name,
        card: this.newPayment.card,
        date: this.newPayment.date
      });
      // Reload payments
      this.payments = this.userProfileService.getPayments();
      this.selectedPayment = this.payments[this.payments.length - 1];
      this.showAddPayment = false;
      this.newPayment = { name: '', card: '', date: '', cvc: '' };
    }
  }

  canPlaceOrder(): boolean {
    return this.cart.length > 0 && this.selectedAddress !== null && this.selectedPayment !== null;
  }

  placeOrder(): void {
    if (!this.canPlaceOrder()) {
      return;
    }

    this.isLoading = true;

    const orderAddress: IOrderAddress = {
      name: this.selectedAddress!.name,
      address: this.selectedAddress!.address,
      city: this.selectedAddress!.city,
      state: this.selectedAddress!.state,
      zip: this.selectedAddress!.zip
    };

    const orderPayment: IOrderPayment = {
      name: this.selectedPayment!.name,
      card: this.selectedPayment!.card,
      date: this.selectedPayment!.date
    };

    const order = this.orderService.createOrder(this.cart, orderAddress, orderPayment);
    this.cartService.clearCart();

    this.isLoading = false;
    alert(`Order #${order.id} placed successfully! Total: $${order.total.toFixed(2)}`);
    this.router.navigateByUrl('/orders');
  }
}
