import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  constructor() {}

  getClienti = {
    content: [
      {
        id: 1,
        nome: 'Peppe',
        cognome: 'Vitale',
        dataIscrizione: '1999-08-18T00:00:00',
      },
      {
        id: 2,

        nome: 'Maria',
        cognome: 'Rossi',
        dataIscrizione: '1990-05-15T00:00:00',
      },
      {
        id: 3,
        nome: 'John',
        cognome: 'Doe',
        dataIscrizione: '1985-10-25T00:00:00',
      },
      {
        id: 4,
        nome: 'Anna',
        cognome: 'Smith',
        dataIscrizione: '1998-12-31T00:00:00',
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
