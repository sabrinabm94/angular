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
import { AuthService } from './app/core/services/auth.service';

// Função para configurar persistência de autenticação antes de carregar o estado do usuário
export function configureAuthPersistence(
  authService: AuthService
): () => Promise<void> {
  return async () => {
    await authService.configureAuthPersistence();
  };
}

// Inicialização do Angular com a ordem correta de inicialização
bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    // Configura a persistência de autenticação (AuthService)
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuthPersistence,
      deps: [AuthService],
      multi: true,
    },
  ],
}).catch((err) => console.error('Erro ao inicializar o app:', err));
