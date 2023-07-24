import { Component } from '@angular/core';
import { ILink } from 'src/app/utils/interfaces/link.interface';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent {
  public componentParams: ILink = {
    link: '',
    target: '',
    title: '',
    text: '',
  };

  public sendData(data: ILink): ILink {
    return (this.componentParams = data);
  }
}
