import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioniService {
  constructor() {}

  getPrenotazioni = {
    content: [
      {
        dataPrenotazione: '2023-05-09T00:00:00',
        dataRestituzione: '2023-06-09T00:00:00',
        cliente: {
          id: 1,
          nome: 'Peppe',
          cognome: 'Vitale',
          dataIscrizione: '1999-08-18T00:00:00',
        },
        libro: {
          titolo: '1984',
          autore: 'George Orwell',
          genere: 'Dystopian',
          copie: 3,
        },
        status: 'PRENOTATO',
      },
      {
        dataPrenotazione: '2023-08-18T00:00:00',
        dataRestituzione: '2023-09-18T00:00:00',
        cliente: {
          nome: 'Maria',
          cognome: 'Rossi',
          dataIscrizione: '1990-05-15T00:00:00',
        },
        libro: {
          titolo: 'Il Signore Degli Anelli',
          autore: 'J.R.R. Tolkien',
          genere: 'Fantasy',
          copie: 10,
        },
        status: 'PRENOTATO',
      },
      {
        dataPrenotazione: '2023-02-10T00:00:00',
        dataRestituzione: '2023-02-17T00:00:00',
        cliente: {
          nome: 'John',
          cognome: 'Doe',
          dataIscrizione: '1985-10-25T00:00:00',
        },
        libro: {
          titolo: 'Harry Potter e la Pietra Filosofale',
          autore: 'J.K. Rowling',
          genere: 'Fantasy',
          copie: 5,
        },
        status: 'PRENOTATO',
      },
      {
        dataPrenotazione: '2023-02-11T00:00:00',
        dataRestituzione: '2023-03-11T00:00:00',
        cliente: {
          nome: 'Anna',
          cognome: 'Smith',
          dataIscrizione: '1998-12-31T00:00:00',
        },
        libro: {
          titolo: 'Cronache del ghiaccio e del fuoco',
          autore: 'George R.R. Martin',
          genere: 'Fantasy',
          copie: 8,
        },
        status: 'PRENOTATO',
      },
    ],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      pageNumber: 0,
      pageSize: 20,
      offset: 0,
      unpaged: false,
      paged: true,
    },
    last: true,
    totalPages: 1,
    totalElements: 4,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    first: true,
    numberOfElements: 4,
    size: 20,
    number: 0,
    empty: false,
  };
}
