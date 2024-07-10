// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SearchTemplateComponent } from './search-template.component';
// import { FormComponent } from "../../../../shared/components/form/form.component";
// import { ButtonComponent } from '../../../../shared/components/button/button.component';
// import { GifService } from '../../../../core/services/gif.service';
// import { of, throwError } from 'rxjs';
// import { By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InputComponent } from '../../../../shared/components/input/input.component';
// import { Gif } from '../../../../data/models/gif.model';

// describe('SearchTemplateComponent', () => {
//   let component: SearchTemplateComponent;
//   let fixture: ComponentFixture<SearchTemplateComponent>;
//   let gifService: jasmine.SpyObj<GifService>;

//   const mockGifs: Gif[] = [
//     new Gif('searchTerm', '1', 'Title 1', 'Alt 1', 'type', 'https://example.com/gif1_preview.gif', 'https://example.com/gif1_preview.webp')
//   ];

//   beforeEach(async () => {
//     const gifServiceSpy = jasmine.createSpyObj('GifService', ['searchGifs']);

//     await TestBed.configureTestingModule({
//       imports: [SearchTemplateComponent, FormComponent, InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
//       declarations: [SearchTemplateComponent],
//       providers: [{ provide: GifService, useValue: gifServiceSpy }]
//     }).compileComponents();

//     gifService = TestBed.inject(GifService) as jasmine.SpyObj<GifService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SearchTemplateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should create the form with the specified fields', () => {
//     expect(component.form).toBeTruthy();
//     expect(component.form.controls['term']).toBeTruthy();
//     expect(component.form.controls['limit']).toBeTruthy();
//   });

//   it('should call searchGifs and emit data when searchBySubscribe is called', () => {
//     const mockResponse = { data: { data: [{ id: '1', title: 'Title 1', alt_text: 'Alt 1', type: 'type', images: { preview_gif: { url: 'https://example.com/gif1_preview.gif' }, preview_webp: { url: 'https://example.com/gif1_preview.webp' } } }] } };
//     gifService.searchGifs.and.returnValue(of(mockResponse));

//     spyOn(component.dataEmitter, 'emit');

//     component.form.controls['term'].setValue('searchTerm');
//     component.form.controls['limit'].setValue('10');
//     component.searchBySubscribe({ preventDefault: () => {} });

//     expect(gifService.searchGifs).toHaveBeenCalledWith('searchTerm', '10');
//     expect(component.dataEmitter.emit).toHaveBeenCalledWith(mockGifs);
//   });

//   it('should handle errors from searchGifs', () => {
//     gifService.searchGifs.and.returnValue(throwError(() => new Error('Test Error')));

//     component.form.controls['term'].setValue('searchTerm');
//     component.form.controls['limit'].setValue('10');
//     component.searchBySubscribe({ preventDefault: () => {} });

//     expect(component.error).toEqual(new Error('Test Error'));
//   });

//   it('should set the form values correctly when searchBySubscribe is called', () => {
//     const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
//     formElement[0].value = 'searchTerm';
//     formElement[1].value = '10';

//     component.searchBySubscribe({ preventDefault: () => {}, srcElement: formElement });

//     expect(component.form.value.term).toBe('searchTerm');
//     expect(component.form.value.limit).toBe('10');
//   });
// });
