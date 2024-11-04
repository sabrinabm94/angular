import { Component } from '@angular/core';
import { SwitchLanguageNavComponent } from "../switch-language-nav/switch-language-nav.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [SwitchLanguageNavComponent]
})
export class HeaderComponent {

}
