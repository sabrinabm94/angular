import { Component, Input } from '@angular/core';
import { IButton } from 'src/app/utils/interfaces/IButton.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() public className: string = "";
  @Input() public text: string = "";
  @Input() public disabled: string = "";

  public componentParams: IButton = {
    className: this.className,
    text: this.text
  };
}
