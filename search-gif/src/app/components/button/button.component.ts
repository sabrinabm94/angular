import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @HostBinding('class') hostClass: string = "app-button";

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() form: any = null;
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
