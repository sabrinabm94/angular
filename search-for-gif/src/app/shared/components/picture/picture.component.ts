import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent implements OnInit {
  @HostBinding('class') hostClass: string = "app-picture";

  @Input() id: string = "";
  @Input() class: string = "";
  //@Input() image: string = "";
  @Input() image!: string;

  constructor() {}

  ngOnInit(): void {}
}
