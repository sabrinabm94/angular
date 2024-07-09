import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-picture',
  standalone: false,
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent {
  @HostBinding('class') hostClass: string = "app-picture";

  @Input() id: string = "";
  @Input() class: string = "";
  @Input() image!: string;

  constructor() {}

  ngOnInit(): void {}
}
