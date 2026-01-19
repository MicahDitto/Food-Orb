import { IFood } from './ifood';

export interface IOrderAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface IOrderPayment {
  name: string;
  card: string;
  date: string;
}

export interface IOrder {
  id: number;
  items: IFood[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  address: IOrderAddress;
  payment: IOrderPayment;
  createdAt: Date;
}
