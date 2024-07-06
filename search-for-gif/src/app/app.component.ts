import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar módulos comuns se necessário

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent {
  title = 'search-for-gif';
}
