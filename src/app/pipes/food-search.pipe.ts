import { Pipe, PipeTransform } from '@angular/core';
import { IFood } from '../interfaces/ifood';

@Pipe({
  name: 'foodSearch'
})
export class FoodSearchPipe implements PipeTransform {

  transform(value: IFood[], searchValue: string): IFood[] {
    return value.filter((item) => {
      return item.foodName.toLowerCase().includes(searchValue.toLowerCase());
    })
  }
}

