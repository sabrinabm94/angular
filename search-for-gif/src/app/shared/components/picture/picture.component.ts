import { Component, HostBinding, Input } from '@angular/core';

/**
 * PictureComponent é um componente standalone que exibe uma imagem com opções
 * configuráveis como id, class, título, URL da imagem e um texto alternativo (alt).
 */
@Component({
  selector: 'app-picture',
  standalone: true,
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css',
})
export class PictureComponent {
  @HostBinding('class') hostClass: string = 'app-picture';
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() urlPreview: string = '';
  @Input() alt: string = '';

  ngOnInit(): void {}
}
