import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from './core/transloco/transloco-root.module';
import { FirebaseAppModule } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslocoRootModule,
    FirebaseAppModule,
    AngularFireAuthModule,
  ],
})
export class AppComponent {
  title = 'tdah-mais-foco';
}
