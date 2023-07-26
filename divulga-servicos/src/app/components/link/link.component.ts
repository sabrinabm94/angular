import { Component } from '@angular/core';
import { ILink } from 'src/app/utils/interfaces/ILink.interface';

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

  public linkIndex = 0;

  public sendData(data: ILink): ILink {
    this.linkIndex = this.linkIndex++;
    return (this.componentParams = data);
  }
}
