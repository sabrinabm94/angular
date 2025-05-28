import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() show: boolean = false;
}
