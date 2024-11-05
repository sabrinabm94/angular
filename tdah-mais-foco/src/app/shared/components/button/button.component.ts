import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @HostBinding('class') hostClass: string = 'app-button';
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() form: any = null;
  @Input() disabled: boolean = false;
}
