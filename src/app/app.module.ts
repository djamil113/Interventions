import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieData } from './probleme/categorie-data';
import { ProblemeComponent } from './probleme/probleme.component';
import { ProblemeService } from './probleme/probleme.service';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
