import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parkrun'
})
export class ParkrunPipe implements PipeTransform {
  transform(value: number): string {
    return value <= 9 ? "0" + value.toString() : value.toString();
  }
}