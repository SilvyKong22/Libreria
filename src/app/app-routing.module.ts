import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { PrenotazioniComponent } from './routes/prenotazioni/prenotazioni.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UtentiComponent } from './routes/utenti/utenti.component';
import { AddEditUtente } from './routes/add-edit-utente/add-edit-utente.component';
import { AddEditPrenotazioneComponent } from './routes/add-edit-prenotazione/add-edit-prenotazione.component';
import { LibriComponent } from './routes/libri/libri.component';
import { ClientiComponent } from './routes/clienti/clienti.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'utenti', pathMatch: 'full' },

  { path: 'utenti', component: UtentiComponent, canActivate: [AuthGuard] },

  {
    path: 'clienti',
    component: ClientiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'libri',
    component: LibriComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prenotazioni',
    component: PrenotazioniComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'utenti/add-edit-utente',
    component: AddEditUtente,
    canActivate: [AuthGuard],
  },

  {
    path: 'prenotazioni/add-edit-prenotazione',
    component: AddEditPrenotazioneComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'page-not-found',
    component: NotFoundComponent,
  },

  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
