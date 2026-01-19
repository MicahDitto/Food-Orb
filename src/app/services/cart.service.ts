import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IFood } from "../interfaces/ifood";
import { IRestaurant } from "../interfaces/irestaurant";
import { StorageService } from "./storage.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cartKey = 'cart';
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  getFoods(): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${this.apiUrl}/foods`);
  }

  getRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.apiUrl}/restaurants`);
  }

  addToCart(item: IFood): void {
    const cart = this.getItemsFromCart();
    cart.push(item);
    this.saveCart(cart);
  }

  getItemsFromCart(): IFood[] {
    const cartJson = this.storage.getItem(this.cartKey);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  removeFromCart(index: number): void {
    const cart = this.getItemsFromCart();
    cart.splice(index, 1);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.storage.removeItem(this.cartKey);
  }

  getCartCount(): number {
    return this.getItemsFromCart().length;
  }

  private saveCart(cart: IFood[]): void {
    this.storage.setItem(this.cartKey, JSON.stringify(cart));
  }
}
