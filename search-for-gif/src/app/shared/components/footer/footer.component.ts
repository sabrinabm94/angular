import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @HostBinding('class') class: string = "app-footer";

  constructor() { }

  ngOnInit(): void {
  }
}
