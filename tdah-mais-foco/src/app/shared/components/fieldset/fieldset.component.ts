import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  standalone: true,
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
})
export class FieldsetComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() index: number;
}
