import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translateOrReturnKeyPipe',
  standalone: true,
  pure: false, // Recalcula se a linguagem mudar
})
export class TranslateOrReturnKeyPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(key: any): string | null {
    if (key) {
      return this.translateService.translateOrReturnKey(String(key));
    }
    return key;
  }
}
