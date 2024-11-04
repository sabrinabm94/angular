import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureComponent } from './picture.component';
import { By } from '@angular/platform-browser';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureComponent]
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

  it('should apply input properties correctly', () => {
    component.id = 'test-id';
    component.class = 'test-class';
    component.title = 'Test Title';
    component.url = 'https://example.com/image.jpg';
    component.urlPreview = 'https://example.com/preview.jpg';
    component.alt = 'Test Alt';
    fixture.detectChanges();

    const anchorElement: HTMLAnchorElement = fixture.debugElement.query(By.css('a')).nativeElement;
    const pictureElement: HTMLElement = fixture.debugElement.query(By.css('picture')).nativeElement;
    const figcaptionElement: HTMLElement = fixture.debugElement.query(By.css('figcaption')).nativeElement;

    expect(anchorElement.href).toContain(component.url);
    expect(anchorElement.target).toBe('_blank');
    expect(anchorElement.classList).toContain('link');

    expect(pictureElement.classList).toContain('picture');
    expect(pictureElement.classList).toContain('test-class');
    expect(pictureElement.style.backgroundImage).toContain(`url(${component.urlPreview})`);

    expect(figcaptionElement.textContent).toBe(component.title);
  });

  it('should have correct HostBinding class', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.classList).toContain('app-picture');
  });
});
