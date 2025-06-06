import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { TranslateOrReturnKeyPipe } from '../../../core/pipes/translateOrReturnKey.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    TranslateOrReturnKeyPipe,
    ButtonComponent,
  ],
})
export class ManageListComponent implements OnInit {
  @Input() title: string = '';
  @Input() itemsToManage: any[] = [];
  @Input() labels: string[] = [];
  @Input() isItemDisabled: boolean = false;
  @Input() showCreate?: boolean = false;
  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsToManage'] && changes['itemsToManage'].currentValue) {
      this.itemsToManage = this.generateListOfItemsValid(this.itemsToManage);

      if (!this.labels || this.labels.length === 0) {
        this.labels = this.generateLabelsByProprieties(this.itemsToManage[0]);
      }
    }
  }

  private generateLabelsByProprieties(object: any): string[] {
    if (!object || typeof object !== 'object') {
      return [];
    }

    return Object.keys(object);
  }

  private generateListOfItemsValid(items: any[]): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items;
  }

  public editItem(item: any): void {
    this.edit.emit(item);
  }

  public createItem(): void {
    this.create.emit();
  }

  public deleteItem(): void {
    this.delete.emit();
  }
}
