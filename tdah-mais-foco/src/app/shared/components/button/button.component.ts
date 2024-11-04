import { Component, HostBinding, Input } from '@angular/core';

/**
 * ButtonComponent é um componente standalone que exibe um botão com opções
 * configuráveis como id, classes CSS adicionais, texto, formulário associado e estado desativado.
 */
@Component({
  selector: 'app-button', // Define o seletor utilizado no template HTML
  standalone: true,
  templateUrl: './button.component.html', // Caminho para o arquivo de template do componente
  styleUrls: ['./button.component.css'] // Caminho para o(s) arquivo(s) de estilo do componente
})
export class ButtonComponent {
  /**
   * Define a classe CSS aplicada ao host do componente.
   * Por padrão, a classe 'app-button' é aplicada.
   */
  @HostBinding('class') hostClass: string = "app-button";

  /**
   * Propriedade de entrada para definir um ID único para o botão.
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
   * Propriedade de entrada para o texto exibido no botão.
   * @type {string}
   * @default ""
   */
  @Input() text: string = '';

  /**
   * Propriedade de entrada para associar o botão a um formulário.
   * Pode ser útil para botões de envio dentro de um formulário.
   * @type {any}
   * @default null
   */
  @Input() form: any = null;

  /**
   * Propriedade de entrada para definir se o botão está desativado.
   * @type {boolean}
   * @default false
   */
  @Input() disabled: boolean = false;

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
