import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { Language } from '../../../../data/models/language.interface';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
  imports: [HeaderComponent, FooterComponent, TranslatePipe],
  providers: [],
})
export class NotFoundPageComponent {
  public languageId: number = 0;
  public userId: string | null = null;
  public isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
  }

  async getUser(): Promise<string | null> {
    if (!this.userId) {
      // Evitar chamada duplicada
      const user = this.userService.getUser();
      if (user && user.uid) {
        this.isAdmin = await this.userService.isUserAdminById(user.uid);
        return (this.userId = user.uid);
      }
    }
    return null;
  }

  private getLanguage(): number | null {
    const language: Language | null = this.translateService.getActiveLanguage();
    if (language) {
      return (this.languageId = language.id);
    }
    return null;
  }
}
