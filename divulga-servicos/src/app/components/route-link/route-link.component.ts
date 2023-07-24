import { Component } from '@angular/core';
import { ILink } from 'src/app/utils/interfaces/link.interface';

@Component({
  selector: 'app-route-link',
  templateUrl: './route-link.component.html',
  styleUrls: ['./route-link.component.css'],
})
export class RouteLinkComponent {

  public componentParams: ILink = {
    link: '',
    target: '',
    title: '',
    text: '',
  };

  public routelinkIndex = 0;

  public sendData(data: ILink): ILink {
    this.routelinkIndex = this.routelinkIndex++;
    return (this.componentParams = data);
  }
}
