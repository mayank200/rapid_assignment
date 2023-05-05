import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'float2'
})
export class FloatTwoPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value:any) {
    return (value!=undefined && value!=null) ? Number(value).toFixed(2) : '';
  }

}
