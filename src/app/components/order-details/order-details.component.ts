import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/interfaces/iorder';

@Component({
  selector: 'foodorb-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: IOrder | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('order_id'));
    this.order = this.orderService.getOrderById(orderId);
  }

  confirmCancel(): void {
    if (!this.order) return;

    if (confirm(`Are you sure you want to cancel Order #${this.order.id}?`)) {
      this.cancelOrder();
    }
  }

  cancelOrder(): void {
    if (!this.order) return;

    const success = this.orderService.cancelOrder(this.order.id);
    if (success) {
      alert('Your order has been cancelled.');
      this.order.status = 'cancelled';
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/orders');
  }
}
