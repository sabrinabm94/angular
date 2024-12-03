import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';
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
  public language: string = '';
  private loggedUser: FirebaseUser | null = null;
  public userId: string = '';

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getCurrentLanguage();
    this.getLoggedUser();
  }

  private getLoggedUser() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        this.userId = user.uid;
        console.warn('Usuário logado: ' + this.userId);
      } else {
        console.warn('Convidado');
      }
    });
  }

  private getCurrentLanguage() {
    this.language = this.languageService.getLanguage();
  }
}
