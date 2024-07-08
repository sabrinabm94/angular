import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @HostBinding('class') hostClass: string = "app-button";

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() form: any = null;
  @Input() disabled: boolean = false;

  ngOnInit(): void {}
}
