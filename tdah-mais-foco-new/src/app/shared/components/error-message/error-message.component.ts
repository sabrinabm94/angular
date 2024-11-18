import { Component, HostBinding, Input } from '@angular/core';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-error-message',
  standalone: true,
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  imports: [TranslatePipe],
})
export class ErrorMessageComponent {}
