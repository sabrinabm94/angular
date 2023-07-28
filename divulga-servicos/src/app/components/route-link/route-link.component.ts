import { Component, Input } from '@angular/core';
import { ILink } from 'src/app/utils/interfaces/ILink.interface';

@Component({
  selector: 'app-route-link',
  templateUrl: './route-link.component.html',
  styleUrls: ['./route-link.component.css'],
})
export class RouteLinkComponent {
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
