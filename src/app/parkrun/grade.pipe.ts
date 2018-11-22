import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade'
})
export class GradePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length == 2) { return value + ".00"; }
    if (value.length == 4) { return value + "0"; }
    return value;
  }
}