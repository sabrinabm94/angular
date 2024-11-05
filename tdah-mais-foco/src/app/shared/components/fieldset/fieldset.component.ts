import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  standalone: true,
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  imports: [CommonModule],
})
export class FieldsetComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() index: number;
}
