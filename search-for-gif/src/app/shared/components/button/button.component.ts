import { Component, HostBinding, Input } from '@angular/core';

/**
 * ButtonComponent é um componente standalone que exibe um botão com opções
 * configuráveis como id, classes CSS adicionais, texto, formulário associado e estado desativado.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @HostBinding('class') hostClass: string = 'app-button';
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() disabled: boolean = false;

  ngOnInit(): void {}
}
