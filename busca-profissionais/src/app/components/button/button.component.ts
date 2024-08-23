import { Component, HostBinding, Input } from '@angular/core';
import { IButton } from '@app/utils/interfaces/IButton.interface';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @HostBinding('class') hostClass: string = "app-button";

  @Input() public className: string = "";
  @Input() public text: string = "";
  @Input() public disabled: string = "";

  public componentParams: IButton = {
    className: this.className,
    text: this.text
  };
}

