import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'datex'
})
export class DatexPipe implements PipeTransform {

    transform(value: any, format: string = ''): any {
        if (!value || value === '') { return ''; }
        if (!format || format === '') { format = 'date'; }
        if (format === 'datetime' || format === 'Time Stamp') {
            format = 'DD-MM-YYYY hh:mm A';
        } else if (format === 'time' || format === 'Time') {
            format = 'hh:mm A';
        } else if (format === 'date' || format === 'Date') {
            format = 'DD MMM,YYYY';
        } else if (format === 'datetime_DTC') {
            format = 'DD-MM-YYYY hh:mm:ss A';
        } else {
        }
        const dt = moment(value).format(format);
        return dt;
    }

}
