import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-picture",
  templateUrl: "./picture.component.html",
  styleUrls: ["./picture.component.css"],
})
export class PictureComponent implements OnInit {
  @Input() id: string;
  @Input() class: string;
  @Input() image: string;

  constructor() {}

  ngOnInit() {}
}
