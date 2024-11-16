import { Component, HostBinding, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-error-message',
  standalone: true,
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  imports: [TranslocoModule],
})
export class ErrorMessageComponent {}
