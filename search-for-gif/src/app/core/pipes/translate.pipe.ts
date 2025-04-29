import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translatePipe',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor() {}

  transform(key: any): string {
    if (key) {
    }
    return '';
  }
}
