import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
})
export class FieldsetComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() index: number = 0;
  @Input() content_style: string = "";
}
