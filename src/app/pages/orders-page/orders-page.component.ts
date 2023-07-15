import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/interfaces/ifood';

@Component({
  selector: 'foodorb-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

// HARD CODED
orders: IFood[] = [
  { foodID: 1, foodName: "chicken", restaurant: "McDonalds", description: "Large juicy chicken nuggets breaded or battered, then deep-fried or baked.", price: 10}
]

  constructor() { }

  ngOnInit(): void {
  }

}
