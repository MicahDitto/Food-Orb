import ValueConverter from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { IFood } from '../interfaces/ifood';

val
@Pipe({
  name: 'foodSearch'
})
export class FoodSearchPipe implements PipeTransform {

  
  transform(value: IFood[], searchValue: string): any {
    // console.log(value);
    return value.filter((item)=>{
        return item.foodName.toLowerCase().includes(searchValue.toLowerCase());
    })
  }

}

