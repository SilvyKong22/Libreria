import { Cliente } from './cliente.dto';
import { Libro } from './libro.dto';

export interface Prenotazione {
  inizioPrenotazione: string;
  finePrenotazione: string;
  cliente: Cliente;
  libro: Libro;
  status: string;
}
