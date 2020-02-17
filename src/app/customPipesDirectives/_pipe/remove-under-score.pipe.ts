import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderScore'
})
export class RemoveUnderScorePipe implements PipeTransform {

  transform(value: any, from?: any, to?:any): any {
    value = value || '';
    from = from || '';
    to = to || '';
    return value.replace(new RegExp(from, 'g'), to);
  }

}
