import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() name: string = '';
  @Input() pattern: string = '';
  @Input() placeholder: string = '';
  @Input() form: any = null;
  @Input() required: string = '';

  constructor() {}

  ngOnInit(): void {}
}
