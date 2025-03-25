/**
 * @fileoverview Componente para apresentar mensagens de sucesso, erro ou aviso
 * @author Sabrina B. M. (sabrinabm94@gmail.com)
 * @copyright 2025 Sabrina
 * @license Privado
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  imports: [CommonModule, TranslatePipe],
})
export class AlertMessageComponent {
  @Input() message: string = '';
  @Input() type: string = 'info'; // Valor padrão para tipo
  @Input() trigger: boolean = false;
  @Input() autoHide: boolean = false;

  @Output() alertEmitted = new EventEmitter<void>();

  private autoHideTime: number = 4000;

  constructor(
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger']?.currentValue) {
      this.showAlert();
    }
  }

  private showAlert(): void {
    if (this.autoHide) {
      setTimeout(() => {
        this.trigger = false;
      }, this.autoHideTime);
    }
    //this.alertEmitted.emit();
    this.alertService.alertMessageEmmited();
  }
}
