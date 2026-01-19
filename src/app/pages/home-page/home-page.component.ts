import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFood } from 'src/app/interfaces/ifood';
import { IRestaurant } from 'src/app/interfaces/irestaurant';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'foodorb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchValue = '';
  foodList: IFood[] = [];
  allFoods: IFood[] = [];
  restaurants: IRestaurant[] = [];
  selectedRestaurant = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getFoods().subscribe((foods: IFood[]) => {
      this.allFoods = foods;
      this.foodList = foods;
    });

    this.cartService.getRestaurants().subscribe((restaurants: IRestaurant[]) => {
      this.restaurants = restaurants;
    });
  }

  filterByRestaurant(): void {
    if (this.selectedRestaurant === '') {
      this.foodList = this.allFoods;
    } else {
      this.foodList = this.allFoods.filter(food => food.restaurant === this.selectedRestaurant);
    }
  }

  confirmCart(item: IFood): void {
    if (confirm(`Confirm add ${item.restaurant} ${item.foodName} to cart?`)) {
      this.addToCart(item);
    }
  }

  addToCart(product: IFood): void {
    this.cartService.addToCart(product);
    alert('Your product has been added to the cart!');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/300x200/CCCCCC/333333?text=No+Image';
  }
}
