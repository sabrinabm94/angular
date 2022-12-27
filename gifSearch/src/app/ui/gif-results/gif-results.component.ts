import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-gif-results",
  templateUrl: "./gif-results.component.html",
  styleUrls: ["./gif-results.component.css"],
})
export class GifResultsComponent implements OnInit {
  @Input() receiveGifs: (gifs: any) => void;

  constructor() {}

  ngOnInit() {}
}
