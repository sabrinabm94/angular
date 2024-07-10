import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsTemplateComponent } from './results-template.component';
import { PictureComponent } from "../../../../shared/components/picture/picture.component";
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination'; // Substitua pelo caminho correto se necessário
import { Gif } from '../../../../data/models/gif.model';

describe('ResultsTemplateComponent', () => {
  let component: ResultsTemplateComponent;
  let fixture: ComponentFixture<ResultsTemplateComponent>;

  const mockGifs: Gif[] = [
    {
      id: '1',
      url: 'https://example.com/gif1.gif',
      urlPreview: 'https://example.com/gif1_preview.gif',
      title: 'Gif 1',
      alt: 'Gif 1',
      searchTerm: 'cat',
      type: ''
    },
    {
      id: '2',
      url: 'https://example.com/gif2.gif',
      urlPreview: 'https://example.com/gif2_preview.gif',
      title: 'Gif 2',
      alt: 'Gif 2',
      searchTerm: 'cat',
      type: ''
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsTemplateComponent, PictureComponent, CommonModule],
      declarations: [PaginationControlsComponent], // Declare o componente de paginação se necessário
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the results section when data is provided', () => {
    component.data = mockGifs;
    fixture.detectChanges();

    const resultsSection: DebugElement = fixture.debugElement.query(By.css('.results'));
    expect(resultsSection).toBeTruthy();

    const gifElements = fixture.debugElement.queryAll(By.css('.gif-link'));
    expect(gifElements.length).toBe(mockGifs.length);
  });

  it('should render the search term in the title', () => {
    component.data = mockGifs;
    fixture.detectChanges();

    const searchTermElement: DebugElement = fixture.debugElement.query(By.css('.small-title'));
    expect(searchTermElement.nativeElement.textContent.trim()).toBe('cat');
  });

  it('should update the current page when pageChange event is triggered', () => {
    component.handlePageChange(3);
    expect(component.p).toBe(3);
  });
});
