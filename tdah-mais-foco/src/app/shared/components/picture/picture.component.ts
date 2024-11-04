import { Component, HostBinding, Input } from '@angular/core';

/**
 * PictureComponent é um componente standalone que exibe uma imagem com opções
 * configuráveis como id, class, título, URL da imagem e um texto alternativo (alt).
 */
@Component({
  selector: 'app-picture', // Define o seletor utilizado no template HTML
  standalone: true,
  templateUrl: './picture.component.html', // Caminho para o arquivo de template do componente
  styleUrl: './picture.component.css', // Caminho para o arquivo de estilo do componente
})
export class PictureComponent {
  /**
   * Define a classe CSS aplicada ao host do componente.
   * Por padrão, a classe 'app-picture' é aplicada.
   */
  @HostBinding('class') hostClass: string = 'app-picture';

  /**
   * Propriedade de entrada para definir um ID único para a imagem.
   * @type {string}
   * @default ""
   */
  @Input() id: string = '';

  /**
   * Propriedade de entrada para adicionar uma ou mais classes CSS personalizadas ao componente.
   * @type {string}
   * @default ""
   */
  @Input() class: string = '';

  /**
   * Propriedade de entrada para definir o título descritivo da imagem.
   * Pode ser utilizado como tooltip ou para SEO.
   * @type {string}
   * @default ""
   */
  @Input() title: string = '';

  /**
   * Propriedade de entrada para a URL da imagem a ser exibida.
   * @type {string}
   * @default ""
   */
  @Input() url: string = '';

  /**
   * Propriedade de entrada para a URL de pré-visualização da imagem.
   * Pode ser usada para carregar uma versão menor ou em baixa resolução antes da imagem principal.
   * @type {string}
   * @default ""
   */
  @Input() urlPreview: string = '';

  /**
   * Propriedade de entrada para o texto alternativo da imagem.
   * Muito importante para acessibilidade e SEO.
   * @type {string}
   * @default ""
   */
  @Input() alt: string = '';

  /**
   * Construtor da classe, pode ser utilizado para injetar dependências ou
   * inicializar variáveis do componente.
   */
  constructor() {}

  /**
   * Método de ciclo de vida do Angular, chamado após a inicialização do componente.
   * Útil para realizar lógica adicional após o componente ser renderizado.
   */
  ngOnInit(): void {}
}
