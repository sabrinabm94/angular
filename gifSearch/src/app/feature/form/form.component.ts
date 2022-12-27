import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  @Input() id: string;
  @Input() class: string;
  @Input() formGroup: string;

  constructor() {}

  ngOnInit() {}
}
