import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
  imports: [HeaderComponent, FooterComponent, TranslatePipe],
  providers: [],
})
export class NotFoundPageComponent {
  public languageName: string | null = null;
  public userId: string | null = null;

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
  }

  private getUser(): string | null {
    const user = this.userService.getUser();
    console.log('this.userId ', this.userId);
    return (this.userId = user ? user.uid : null);
  }

  private getLanguage(): string | null {
    const language = this.languageService.getLanguage();
    return (this.languageName = language ? language : null);
  }
}
