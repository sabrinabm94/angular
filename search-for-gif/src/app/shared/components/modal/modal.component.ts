import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() imageUrl: string = '';
  @Output() close = new EventEmitter<void>();

  isValidUrl(url: string): boolean {
    if (url && url.trim() !== '') {
      return true;
    }
    return false;
  }

  closeModal() {
    this.close.emit();
  }
}
