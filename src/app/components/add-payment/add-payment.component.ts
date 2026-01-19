import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

interface Payment {
  name: string;
  card: string;
  date: string;
  cvc: string;
}

@Component({
  selector: 'foodorb-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent {
  @Output() paymentAdded = new EventEmitter<Payment>();

  newPaymentForm: Payment = {
    name: '',
    card: '',
    date: '',
    cvc: ''
  };

  successMessage = '';

  constructor(private storage: StorageService) {}

  addPayment(): void {
    const payments = this.getPayments();
    const maskedPayment = {
      ...this.newPaymentForm,
      card: this.maskCardNumber(this.newPaymentForm.card)
    };
    payments.push(maskedPayment);
    this.storage.setItem('payments', JSON.stringify(payments));

    this.successMessage = 'Payment method added successfully!';
    this.paymentAdded.emit(this.newPaymentForm);

    this.newPaymentForm = { name: '', card: '', date: '', cvc: '' };

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private getPayments(): Payment[] {
    const paymentsJson = this.storage.getItem('payments');
    return paymentsJson ? JSON.parse(paymentsJson) : [];
  }

  private maskCardNumber(card: string): string {
    if (card.length < 4) return card;
    return '*'.repeat(card.length - 4) + card.slice(-4);
  }
}
