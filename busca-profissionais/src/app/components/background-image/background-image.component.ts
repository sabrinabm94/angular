import { Component, Input } from '@angular/core';
import { IBackgroundImage } from 'src/app/utils/interfaces/IBackgroundImage.interface';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.css'],
})
export class BackgroundImageComponent {
  @Input() public link: string = '';
  @Input() public title: string = '';

  public componentParams: IBackgroundImage = {
    link: this.link,
    title: this.title,
  };
}
