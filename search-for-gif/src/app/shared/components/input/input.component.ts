import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @HostBinding('class') hostClass: string = "app-input";

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() name: string = '';
  @Input() pattern: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minlength: number = 1;
  @Input() maxlength: number = 10;

  constructor() {}

  ngOnInit(): void {}
}
