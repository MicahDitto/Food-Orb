import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CartService {
  cart = [];
  private url: string = "http://localhost:3000/foods";

  constructor(private http: HttpClient) {}

  getFoods() {
    return this.http.get(this.url);
  }

  private handleError(error: any) {
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    console.log(errMsg);
    return throwError(errMsg);
  }

  addToCart(value) {
    this.cart.push(value);
  }

  getItemsFromCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
