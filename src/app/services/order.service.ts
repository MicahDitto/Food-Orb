import { Injectable } from '@angular/core';
import { IFood } from '../interfaces/ifood';
import { IOrder, IOrderAddress, IOrderPayment } from '../interfaces/iorder';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storageKey = 'orders';

  constructor(private storage: StorageService) {}

  getOrders(): IOrder[] {
    const ordersJson = this.storage.getItem(this.storageKey);
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  getOrderById(id: number): IOrder | undefined {
    return this.getOrders().find(order => order.id === id);
  }

  createOrder(items: IFood[], address: IOrderAddress, payment: IOrderPayment): IOrder {
    const orders = this.getOrders();
    const total = items.reduce((sum, item) => sum + item.price, 0);

    const newOrder: IOrder = {
      id: Date.now(),
      items,
      total,
      status: 'pending',
      address,
      payment,
      createdAt: new Date()
    };

    orders.push(newOrder);
    this.storage.setItem(this.storageKey, JSON.stringify(orders));

    return newOrder;
  }

  cancelOrder(id: number): boolean {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === id);

    if (orderIndex === -1) {
      return false;
    }

    orders[orderIndex].status = 'cancelled';
    this.storage.setItem(this.storageKey, JSON.stringify(orders));
    return true;
  }

  clearOrders(): void {
    this.storage.removeItem(this.storageKey);
  }
}
