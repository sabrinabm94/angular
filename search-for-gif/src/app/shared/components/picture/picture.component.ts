import { Component, HostBinding, Input, signal } from '@angular/core';

/**
 * PictureComponent é um componente standalone que exibe uma imagem com opções
 * configuráveis como id, class, título, URL da imagem e um texto alternativo (alt).
 */
@Component({
  selector: 'app-picture',
  standalone: true,
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent {
  @HostBinding('class') hostClass = signal<string>('app-picture');

  /** Propriedade de entrada para definir um ID único para a imagem. */
  @Input() id = signal<string>('');

  /** Propriedade de entrada para adicionar uma ou mais classes CSS personalizadas ao componente. */
  @Input() class = signal<string>('');

  /** Propriedade de entrada para definir o título descritivo da imagem. */
  @Input() title = signal<string>('');

  /** Propriedade de entrada para a URL da imagem a ser exibida. */
  @Input() url = signal<string>('');

  /** Propriedade de entrada para a URL de pré-visualização da imagem. */
  @Input() urlPreview = signal<string>('');

  /** Propriedade de entrada para o texto alternativo da imagem. */
  @Input() alt = signal<string>('');

  constructor() {}

  ngOnInit(): void {}
}
