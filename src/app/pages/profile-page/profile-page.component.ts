import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService, UserProfile, UserAddress, UserPayment } from 'src/app/services/user-profile.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { IOrder } from 'src/app/interfaces/iorder';

@Component({
  selector: 'foodorb-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profile: UserProfile | null = null;
  addresses: UserAddress[] = [];
  payments: UserPayment[] = [];
  recentOrders: IOrder[] = [];
  stats = { addressCount: 0, paymentCount: 0, orderCount: 0 };

  constructor(
    private userProfileService: UserProfileService,
    private orderService: OrderService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    // Load profile
    this.profile = this.userProfileService.getProfile();

    // If no profile, try to get email from token
    if (!this.profile) {
      const email = this.userProfileService.getEmailFromToken();
      if (email) {
        this.profile = { name: '', email, phone: '' };
      }
    }

    // Load addresses and payments
    this.addresses = this.userProfileService.getAddresses();
    this.payments = this.userProfileService.getPayments();

    // Load recent orders
    this.recentOrders = this.orderService.getOrders().slice(-5).reverse();

    // Get stats
    this.stats = this.userProfileService.getProfileStats();
  }

  get isLoggedIn(): boolean {
    return this.storage.isAuthenticated();
  }

  goToSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  goToOrders(): void {
    this.router.navigateByUrl('/orders');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  formatAddress(addr: UserAddress): string {
    return `${addr.address}, ${addr.city}, ${addr.state} ${addr.zip}`;
  }
}
