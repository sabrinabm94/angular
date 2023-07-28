import { Component, Input } from '@angular/core';
import { IImage } from 'src/app/utils/interfaces/IImage.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  @Input() public link: string = '';
  @Input() public title: string = '';
  @Input() public width: number | string = 100;
  @Input() public height: number | string = 100;

  public routelinkIndex = 0;

  public componentParams: IImage = {
    link: this.link,
    title: this.title,
    width: this.width,
    height: this.height,
  };
}
