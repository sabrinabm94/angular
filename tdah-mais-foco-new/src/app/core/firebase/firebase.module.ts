import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { FirebaseAppModule } from '@angular/fire/app';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseAppModule,
    AngularFireAuthModule,
  ],
  exports: [AngularFireModule, AngularFireAuthModule, FirebaseAppModule],
})
export class FirebaseModule {}
