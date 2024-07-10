import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureComponent } from './picture.component';
import { By } from '@angular/platform-browser';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureComponent], // Importa o PictureComponent
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with correct href and target attributes', () => {
    component.url = 'https://example.com';
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a'));

    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.getAttribute('href')).toBe(component.url);
    expect(linkElement.nativeElement.getAttribute('target')).toBe('_blank');
  });

  it('should render the figure with the correct id', () => {
    component.id = 'picture-id';
    fixture.detectChanges();

    const figureElement = fixture.debugElement.query(By.css('figure'));

    expect(figureElement).toBeTruthy();
    expect(figureElement.nativeElement.getAttribute('id')).toBe('picture-picture-id');
  });

  it('should render the img with the correct src, alt, and class attributes', () => {
    component.class = 'custom-class';
    component.urlPreview = 'https://example.com/preview.jpg';
    component.alt = 'Picture description';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img'));

    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.getAttribute('src')).toBe(component.urlPreview);
    expect(imgElement.nativeElement.getAttribute('alt')).toBe(component.alt);
    expect(imgElement.nativeElement.classList).toContain('picture');
    expect(imgElement.nativeElement.classList).toContain('custom-class');
    expect(imgElement.nativeElement.classList).toContain('background-image');
  });

  it('should render the figcaption with the correct title', () => {
    component.title = 'Picture Title';
    fixture.detectChanges();

    const figcaptionElement = fixture.debugElement.query(By.css('figcaption'));

    expect(figcaptionElement).toBeTruthy();
    expect(figcaptionElement.nativeElement.textContent.trim()).toBe(component.title);
  });
});
