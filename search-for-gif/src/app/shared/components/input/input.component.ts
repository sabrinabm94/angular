import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
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
