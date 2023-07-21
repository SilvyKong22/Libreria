import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibriService {
  getLibri = {
    content: [
      {
        id: 1,
        titolo: 'Il codice Da Vinci',
        autore: 'Dan Brown',
        genere: 'Mystery',
        copie: 7,
      },
      {
        id: 2,
        titolo: 'To Kill a Mockingbird',
        autore: 'Harper Lee',
        genere: 'Classic',
        copie: 4,
      },
      {
        id: 3,
        titolo: 'The Great Gatsby',
        autore: 'F. Scott Fitzgerald',
        genere: 'Classic',
        copie: 6,
      },
      {
        id: 4,
        titolo: 'Pride and Prejudice',
        autore: 'Jane Austen',
        genere: 'Classic',
        copie: 3,
      },
      {
        id: 5,
        titolo: '1984',
        autore: 'George Orwell',
        genere: 'Dystopian',
        copie: 3,
      },
      {
        id: 6,
        titolo: 'Il Signore Degli Anelli',
        autore: 'J.R.R. Tolkien',
        genere: 'Fantasy',
        copie: 10,
      },
      {
        id: 7,
        titolo: 'Harry Potter e la Pietra Filosofale',
        autore: 'J.K. Rowling',
        genere: 'Fantasy',
        copie: 5,
      },
      {
        id: 8,
        titolo: 'Cronache del ghiaccio e del fuoco',
        autore: 'George R.R. Martin',
        genere: 'Fantasy',
        copie: 8,
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
    totalElements: 8,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    first: true,
    numberOfElements: 8,
    size: 20,
    number: 0,
    empty: false,
  };

  constructor() {}
}
