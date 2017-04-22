import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderby',
})
export class Orderby implements PipeTransform {
  transform(array, args)
  {
    return _.sortBy(array, args);
  }
}
