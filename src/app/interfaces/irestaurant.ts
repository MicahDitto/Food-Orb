import { IFood } from './ifood';

export interface IRestaurant {
    restaurantID: number,
    restaurantName: string,
    menu: IFood[],
    address: string,
    phone: string
}
