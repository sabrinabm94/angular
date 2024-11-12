import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FirebaseModule } from './firebase.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  providers: [TranslocoModule],
  imports: [CommonModule, RouterModule, SharedModule, HttpClientModule],
  exports: [],
  declarations: [],
})
export class AppModule {}
