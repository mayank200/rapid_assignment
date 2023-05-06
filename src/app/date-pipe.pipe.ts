import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'date'
})
export class DatePipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value:any) {
    return (value!=undefined && value!=null) ? new Date(value).toLocaleString().replace(',','<br><br>') : '';
  }

}
