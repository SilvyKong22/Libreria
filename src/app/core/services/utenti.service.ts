import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Utente } from '../dto/utente.dto';
import { API_Response } from '../dto/API_response.dto';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {
  editUtente$ = new BehaviorSubject<Utente | null>(null);

  constructor(private http: HttpClient) {}

  getUtenti(
    page: number,
    size: number,
    email?: string,
    nome?: string,
    cognome?: string,
    dataIscrizione?: string
  ): Observable<API_Response<Utente>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (email && email.length > 0) {
      params = params.set('email', email);
    }

    if (nome && nome.length > 0) {
      params = params.set('nome', nome);
    }

    if (cognome && cognome.length > 0) {
      params = params.set('cognome', cognome);
    }

    if (dataIscrizione && dataIscrizione.length > 0) {
      params = params.set('dataIscrizione', dataIscrizione);
    }

    return this.http.get<API_Response<Utente>>(environment.BASE_URL, {
      params,
    });
  }

  getUtente(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${environment.BASE_URL}/${id}`);
  }

  addUtente(data: Utente): Observable<Utente> {
    return this.http.post<Utente>(`${environment.BASE_URL}`, data);
  }

  editUtente(id: number, data: Utente): Observable<Utente> {
    return this.http.put<Utente>(`${environment.BASE_URL}/${id}`, data);
  }

  deleteUtente(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.BASE_URL}/${id}`);
  }
}
