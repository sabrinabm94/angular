import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [ReactiveFormsModule]
})
export class InputComponent {
  @HostBinding('class') hostClass: string = "app-input";

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() name: string = '';
  @Input() pattern: string = '';
  @Input() placeholder: string = '';
  @Input() control: string = '';
  @Input() required: boolean = false;
  @Input() minlength: number = 1;
  @Input() maxlength: number = 10;

  constructor() {}

  ngOnInit(): void {}
}
