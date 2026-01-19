import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IOrder } from '../interfaces/iorder';

export interface UserAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserPayment {
  name: string;
  card: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly PROFILE_KEY = 'user-profile';
  private readonly ADDRESSES_KEY = 'addresses';
  private readonly PAYMENTS_KEY = 'payments';
  private readonly ORDERS_KEY = 'orders';

  constructor(private storage: StorageService) {}

  // Profile methods
  getProfile(): UserProfile | null {
    const profileJson = this.storage.getItem(this.PROFILE_KEY);
    return profileJson ? JSON.parse(profileJson) : null;
  }

  saveProfile(profile: UserProfile): void {
    this.storage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }

  updateProfile(updates: Partial<UserProfile>): void {
    const current = this.getProfile() || { name: '', email: '', phone: '' };
    const updated = { ...current, ...updates };
    this.saveProfile(updated);
  }

  // Extract email from JWT token
  getEmailFromToken(): string | null {
    const token = this.storage.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  }

  // Address methods
  getAddresses(): UserAddress[] {
    const addressesJson = this.storage.getItem(this.ADDRESSES_KEY);
    return addressesJson ? JSON.parse(addressesJson) : [];
  }

  addAddress(address: UserAddress): void {
    const addresses = this.getAddresses();
    addresses.push(address);
    this.storage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
  }

  updateAddress(index: number, address: UserAddress): void {
    const addresses = this.getAddresses();
    if (index >= 0 && index < addresses.length) {
      addresses[index] = address;
      this.storage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
    }
  }

  removeAddress(index: number): void {
    const addresses = this.getAddresses();
    if (index >= 0 && index < addresses.length) {
      addresses.splice(index, 1);
      this.storage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
    }
  }

  // Payment methods
  getPayments(): UserPayment[] {
    const paymentsJson = this.storage.getItem(this.PAYMENTS_KEY);
    return paymentsJson ? JSON.parse(paymentsJson) : [];
  }

  addPayment(payment: UserPayment): void {
    const payments = this.getPayments();
    // Mask card number before storing
    const maskedPayment = {
      ...payment,
      card: this.maskCardNumber(payment.card)
    };
    payments.push(maskedPayment);
    this.storage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
  }

  removePayment(index: number): void {
    const payments = this.getPayments();
    if (index >= 0 && index < payments.length) {
      payments.splice(index, 1);
      this.storage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
    }
  }

  // Order history methods
  getOrderHistory(): IOrder[] {
    const ordersJson = this.storage.getItem(this.ORDERS_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  getRecentOrders(limit: number = 5): IOrder[] {
    const orders = this.getOrderHistory();
    return orders.slice(-limit).reverse();
  }

  // Utility methods
  private maskCardNumber(card: string): string {
    if (card.length < 4) return card;
    // If already masked, return as is
    if (card.includes('*')) return card;
    return '*'.repeat(card.length - 4) + card.slice(-4);
  }

  // Clear all user data (for logout)
  clearAllUserData(): void {
    this.storage.removeItem(this.PROFILE_KEY);
    this.storage.removeItem(this.ADDRESSES_KEY);
    this.storage.removeItem(this.PAYMENTS_KEY);
  }

  // Check if user has complete profile
  hasCompleteProfile(): boolean {
    const profile = this.getProfile();
    return !!profile && !!profile.name && !!profile.email;
  }

  // Get summary stats
  getProfileStats(): { addressCount: number; paymentCount: number; orderCount: number } {
    return {
      addressCount: this.getAddresses().length,
      paymentCount: this.getPayments().length,
      orderCount: this.getOrderHistory().length
    };
  }
}
