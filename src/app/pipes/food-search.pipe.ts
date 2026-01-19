import { Pipe, PipeTransform } from '@angular/core';
import { IFood } from '../interfaces/ifood';

@Pipe({
  name: 'foodSearch'
})
export class FoodSearchPipe implements PipeTransform {

  transform(value: IFood[], searchValue: string): IFood[] {
    if (!searchValue || searchValue.trim() === '') {
      return value;
    }
    const search = searchValue.toLowerCase().trim();
    return value.filter((item) => {
      return item.foodName.toLowerCase().includes(search) ||
             item.restaurant.toLowerCase().includes(search);
    });
  }
}

