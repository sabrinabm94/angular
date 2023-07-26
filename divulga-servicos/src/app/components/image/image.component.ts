import { Component } from '@angular/core';
import { IImage } from 'src/app/utils/interfaces/IImage.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  public componentParams: IImage = {
    link: '',
    title: '',
    width: 100,
    height: 100,
  };

  public sendData(data: IImage): IImage {
    return (this.componentParams = data);
  }
}
