import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './routes/login/login.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { PrenotazioniComponent } from './routes/prenotazioni/prenotazioni.component';
import { MaterialModule } from './core/modules/material/material.module';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { UtentiComponent } from './routes/utenti/utenti.component';
import { DynamicFiltersComponent } from './components/dynamic-filters/dynamic-filters.component';
import { AddEditUtente } from './routes/add-edit-utente/add-edit-utente.component';
import { AddEditPrenotazioneComponent } from './routes/add-edit-prenotazione/add-edit-prenotazione.component';
import { DynamicDialogComponent } from './components/dynamic-dialog/dynamic-dialog.component';
import { LibriComponent } from './routes/libri/libri.component';
import { ClientiComponent } from './routes/clienti/clienti.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UtentiComponent,
    AddEditUtente,
    DynamicTableComponent,
    PrenotazioniComponent,
    DynamicFiltersComponent,
    AddEditPrenotazioneComponent,
    DynamicDialogComponent,
    LibriComponent,
    ClientiComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
