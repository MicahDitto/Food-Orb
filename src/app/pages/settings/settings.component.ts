import { Component, OnInit } from '@angular/core';
import { UserProfileService, UserAddress, UserPayment, UserProfile } from 'src/app/services/user-profile.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'foodorb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // Tab management
  activeTab: 'profile' | 'addresses' | 'payments' = 'profile';

  // Profile
  profile: UserProfile = { name: '', email: '', phone: '' };
  profileMessage = '';
  profileMessageType: 'success' | 'error' = 'success';

  // Addresses
  addresses: UserAddress[] = [];
  showAddAddress = false;
  editingAddressIndex: number | null = null;
  newAddress: UserAddress = { name: '', address: '', city: '', state: '', zip: '' };

  // Payments
  payments: UserPayment[] = [];
  showAddPayment = false;
  newPayment = { name: '', card: '', date: '', cvc: '' };

  constructor(
    private userProfileService: UserProfileService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadAddresses();
    this.loadPayments();
  }

  // Tab switching
  setActiveTab(tab: 'profile' | 'addresses' | 'payments'): void {
    this.activeTab = tab;
  }

  // Profile methods
  loadProfile(): void {
    const savedProfile = this.userProfileService.getProfile();
    if (savedProfile) {
      this.profile = savedProfile;
    } else {
      // Try to get email from token
      const email = this.userProfileService.getEmailFromToken();
      if (email) {
        this.profile.email = email;
      }
    }
  }

  saveProfile(): void {
    if (!this.profile.name || !this.profile.email) {
      this.showProfileMessage('Name and email are required', 'error');
      return;
    }
    this.userProfileService.saveProfile(this.profile);
    this.showProfileMessage('Profile saved successfully!', 'success');
  }

  showProfileMessage(message: string, type: 'success' | 'error'): void {
    this.profileMessage = message;
    this.profileMessageType = type;
    setTimeout(() => this.profileMessage = '', 3000);
  }

  // Address methods
  loadAddresses(): void {
    this.addresses = this.userProfileService.getAddresses();
  }

  toggleAddAddress(): void {
    this.showAddAddress = !this.showAddAddress;
    if (this.showAddAddress) {
      this.editingAddressIndex = null;
      this.newAddress = { name: '', address: '', city: '', state: '', zip: '' };
    }
  }

  editAddress(index: number): void {
    this.editingAddressIndex = index;
    this.newAddress = { ...this.addresses[index] };
    this.showAddAddress = true;
  }

  saveAddress(): void {
    if (!this.newAddress.name || !this.newAddress.address || !this.newAddress.city ||
        !this.newAddress.state || !this.newAddress.zip) {
      return;
    }

    if (this.editingAddressIndex !== null) {
      this.userProfileService.updateAddress(this.editingAddressIndex, this.newAddress);
    } else {
      this.userProfileService.addAddress(this.newAddress);
    }

    this.loadAddresses();
    this.showAddAddress = false;
    this.editingAddressIndex = null;
    this.newAddress = { name: '', address: '', city: '', state: '', zip: '' };
  }

  removeAddress(index: number): void {
    if (confirm('Are you sure you want to remove this address?')) {
      this.userProfileService.removeAddress(index);
      this.loadAddresses();
    }
  }

  cancelAddressEdit(): void {
    this.showAddAddress = false;
    this.editingAddressIndex = null;
    this.newAddress = { name: '', address: '', city: '', state: '', zip: '' };
  }

  // Payment methods
  loadPayments(): void {
    this.payments = this.userProfileService.getPayments();
  }

  toggleAddPayment(): void {
    this.showAddPayment = !this.showAddPayment;
    if (this.showAddPayment) {
      this.newPayment = { name: '', card: '', date: '', cvc: '' };
    }
  }

  savePayment(): void {
    if (!this.newPayment.name || !this.newPayment.card || !this.newPayment.date) {
      return;
    }

    this.userProfileService.addPayment({
      name: this.newPayment.name,
      card: this.newPayment.card,
      date: this.newPayment.date
    });

    this.loadPayments();
    this.showAddPayment = false;
    this.newPayment = { name: '', card: '', date: '', cvc: '' };
  }

  removePayment(index: number): void {
    if (confirm('Are you sure you want to remove this payment method?')) {
      this.userProfileService.removePayment(index);
      this.loadPayments();
    }
  }

  cancelPaymentAdd(): void {
    this.showAddPayment = false;
    this.newPayment = { name: '', card: '', date: '', cvc: '' };
  }

  get isLoggedIn(): boolean {
    return this.storage.isAuthenticated();
  }
}
