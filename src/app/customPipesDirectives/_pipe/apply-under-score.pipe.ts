import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyUnderScore'
})
export class ApplyUnderScorePipe implements PipeTransform {

  transform(value: any, from?: any, to?:any): any {
    value = value || '';
    from = from || '';
    to = to || '';
    return value.replace(new RegExp(to, 'g'), from);
  }

}
