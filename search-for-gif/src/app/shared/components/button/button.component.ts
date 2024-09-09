import { Component, HostBinding, Input, signal } from '@angular/core';

/**
 * ButtonComponent é um componente standalone que exibe um botão com opções
 * configuráveis como id, classes CSS adicionais, texto, formulário associado e estado desativado.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @HostBinding('class') hostClass = signal<string>('app-button');

  /** Propriedade de entrada para definir um ID único para o botão. */
  @Input() id = signal<string>('');

  /** Propriedade de entrada para adicionar uma ou mais classes CSS personalizadas ao componente. */
  @Input() class = signal<string>('');

  /** Propriedade de entrada para o texto exibido no botão. */
  @Input() text = signal<string>('');

  /** Propriedade de entrada para associar o botão a um formulário. */
  @Input() form: any = null;

  /** Propriedade de entrada para definir se o botão está desativado. */
  @Input() disabled = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {}
}
