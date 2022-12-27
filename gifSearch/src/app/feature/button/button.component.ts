import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  @Input() id: string;
  @Input() class: string;
  @Input() text: string;
  @Input() form: FormControl;

  constructor() {}

  ngOnInit() {}
}
