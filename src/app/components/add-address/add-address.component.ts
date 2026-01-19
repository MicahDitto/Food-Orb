import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  selector: 'foodorb-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  @Output() addressAdded = new EventEmitter<Address>();

  newAddressForm: Address = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  };

  successMessage = '';

  constructor(private storage: StorageService) {}

  addAddress(): void {
    const addresses = this.getAddresses();
    addresses.push({ ...this.newAddressForm });
    this.storage.setItem('addresses', JSON.stringify(addresses));

    this.successMessage = 'Address added successfully!';
    this.addressAdded.emit(this.newAddressForm);

    this.newAddressForm = { name: '', address: '', city: '', state: '', zip: '' };

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private getAddresses(): Address[] {
    const addressesJson = this.storage.getItem('addresses');
    return addressesJson ? JSON.parse(addressesJson) : [];
  }
}
