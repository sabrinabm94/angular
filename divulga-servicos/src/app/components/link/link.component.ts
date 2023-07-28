import { Component, Input } from '@angular/core';
import { ILink } from 'src/app/utils/interfaces/ILink.interface';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent {
  @Input() public link: string = '';
  @Input() public target: string = '';
  @Input() public title: string = '';

  public routelinkIndex = 0;

  public componentParams: ILink = {
    link: this.link,
    target: this.target,
    title: this.title,
  };
}
