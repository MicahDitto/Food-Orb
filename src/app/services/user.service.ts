import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';
import { IUser } from '../interfaces/iuser';

interface LoginResponse {
  accessToken: string;
}

interface RegisterModel {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface Payment {
  name: string;
  card: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cart: CartService,
    private storage: StorageService
  ) {}

  login(model: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, model)
      .pipe(
        tap((response) => {
          this.storage.setAccessToken(response.accessToken);
        })
      );
  }

  register(model: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, model);
  }

  logout(): void {
    this.cart.clearCart();
    this.storage.removeAccessToken();
    this.router.navigateByUrl('/login');
  }

  getUserDetails(userEmail: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users?email=${userEmail}`);
  }

  addAddressToUser(addresses: Address[], userId: string): void {
    this.router.navigateByUrl('/settings');
    this.http.patch(`${this.apiUrl}/users/${userId}`, { address: addresses })
      .subscribe();
  }

  updateAddresses(addresses: Address[], userId: string): void {
    this.http.patch(`${this.apiUrl}/users/${userId}`, { address: addresses })
      .subscribe();
  }

  getAddressesForUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${userId}`);
  }

  addPaymentToUser(payments: Payment[], userId: string): void {
    this.router.navigateByUrl('/settings');
    this.http.patch(`${this.apiUrl}/users/${userId}`, { payments: payments })
      .subscribe();
  }

  updatePayments(payments: Payment[], userId: string): void {
    this.http.patch(`${this.apiUrl}/users/${userId}`, { payments: payments })
      .subscribe();
  }
}
