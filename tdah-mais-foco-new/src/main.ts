import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { UserService } from './app/core/services/user.service';

// Função de inicialização do UserService
export function initializeAppFactory(
  userService: UserService
): () => Promise<void> {
  return () => userService.initializeUser();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [UserService],
      multi: true, // Garante que todos os inicializadores sejam aguardados
    },
  ],
}).catch((err) => console.error(err));
