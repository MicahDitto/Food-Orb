export interface IUserAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

export interface IUserPayment {
    name: string;
    card: string;
    date: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone?: string;
    fullName?: string;
    address?: IUserAddress[];
    payments?: IUserPayment[];
}