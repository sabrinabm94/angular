import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureComponent } from './picture.component';
import { By } from '@angular/platform-browser';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  //constantes
  const defaultCssClassNameLink: string = 'link';
  const defaultCssClassNameCaption: string = 'figcaption';
  const defaultCssClassNameImg: string = 'img';
  const defaultCssClassNamePicture: string = 'picture';
  const defaultCssClassNameTest: string = 'test-class';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureComponent],
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

    const anchorElement: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a')
    )?.nativeElement;
    const imgElement: HTMLImageElement = fixture.debugElement.query(
      By.css(defaultCssClassNameImg)
    )?.nativeElement;
    const figcaptionElement: HTMLElement = fixture.debugElement.query(
      By.css(defaultCssClassNameCaption)
    )?.nativeElement;

    expect(anchorElement.href).toContain(component.url);
    expect(anchorElement.target).toBe('_blank');
    expect(anchorElement.classList).toContain(defaultCssClassNameLink);
    expect(imgElement.classList).toContain(defaultCssClassNamePicture);
    expect(imgElement.classList).toContain(defaultCssClassNameTest);
    expect(imgElement.src).toContain(component.urlPreview);
    expect(imgElement.alt).toBe(component.alt || component.title);
    expect(figcaptionElement.textContent).toBe(component.title);
  });
});
