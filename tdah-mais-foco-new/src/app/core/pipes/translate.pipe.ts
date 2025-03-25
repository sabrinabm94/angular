import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translatePipe',
  standalone: true,
  pure: false, // Recalcula se a linguagem mudar
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(key: any): string {
    if (key) {
      return this.translateService.translate(String(key));
    }
    return '';
  }
}
