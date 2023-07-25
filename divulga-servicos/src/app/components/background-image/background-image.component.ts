import { Component } from '@angular/core';
import { IBackgroundImage } from 'src/app/utils/interfaces/IBackgroundImage.interface';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.css'],
})
export class BackgroundImageComponent {
  public componentParams: IBackgroundImage = {
    link: '',
    title: ''
  };

  public sendData(data: IBackgroundImage): IBackgroundImage {
    return (this.componentParams = data);
  }
}
