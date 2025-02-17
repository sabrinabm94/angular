import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { FooterComponent } from '../../../../../../shared/components/footer/footer.component';
import { QuestionRegisterComponent } from '../../components/question-register/question-register.component';

@Component({
  selector: 'app-question-register-page',
  standalone: true,
  templateUrl: './question-register-page.component.html',
  styleUrls: ['./question-register-page.component.css'],
  imports: [
    QuestionRegisterComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class QuestionRegisterPageComponent {}
