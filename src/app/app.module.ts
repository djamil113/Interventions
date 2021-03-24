import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LongueurMinimumComponent } from './longueur-minimum/longueur-minimum.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent,
    LongueurMinimumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
