import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { provideHttpClient } from '@angular/common/http'; 

import { provideFirebaseApp, initializeApp } from "@angular/fire/app"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"; 

import { IonicStorageModule } from '@ionic/storage-angular'; // npm install @ionic/storage-angular

import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'; // npm i localforage-cordovasqlitedriver

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())),
    provideRouter(routes),
    provideHttpClient()
  ]
});
