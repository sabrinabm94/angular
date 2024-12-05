import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() className: string = '';
  @Input() form: any = null;
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';

  public componentClassName: string = this.className
    ? ' btn btn-' + this.className
    : ' btn btn-primary';

  constructor() {}
}
