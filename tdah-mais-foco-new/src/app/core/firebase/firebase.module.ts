import { NgModule } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';

@NgModule({
  imports: [FirebaseAppModule],
  exports: [FirebaseAppModule],
})
export class FirebaseModule {}
