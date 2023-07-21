import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, of, switchMap } from 'rxjs';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Utente } from 'src/app/core/dto/utente.dto';
import { LoginService } from 'src/app/core/services/login.service';
import { UtentiService } from 'src/app/core/services/utenti.service';
@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss'],
})
export class UtentiComponent implements OnInit {
  constructor(
    private utentiService: UtentiService,
    private loginService: LoginService,
    private router: Router,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  loggedUser: any = null;
  utentiColumns: string[] = [
    'email',
    'nome',
    'cognome',
    'ruolo',
    'dataIscrizione',
    this.loggedUser ?? 'azioni',
  ];
  utentiSearchFilterForm!: FormGroup;
  utentiData$ = new BehaviorSubject<any>(null);
  paginatorPageIndex: number = 0;
  paginatorSize: number = 5;
  utentiFilterResults: any[] = [];
  @ContentChild('utentiTemplate') utentiTable!: TemplateRef<any>;
  @ContentChild('utentiSearchTemplate') utentiSearchTemplate!: TemplateRef<any>;

  handleSearchCalled = false;

  ngOnInit(): void {
    this.loggedUser = this.loginService.userProfile$.value;

    this.utentiSearchFilterForm = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl(''),
      cognome: new FormControl(''),
      dataIscrizione: new FormControl(''),
    });

    this.loadData();
  }

  loadData() {
    const pageIndex = this.handleSearchCalled ? 0 : this.paginatorPageIndex;

    this.utentiService
      .getUtenti(
        pageIndex,
        this.paginatorSize,
        ...Object.values(this.utentiFilterResults)
      )
      .subscribe({
        next: (response) => {
          this.utentiData$.next(response);
        },
      });
  }

  editUtente(data: Utente) {
    this.utentiService.editUtente$.next(data);
    this.router.navigate(['utenti/add-edit-utente']);
  }

  deleteUtente(id: number) {
    const dialogRef = this._matDialog.open(DynamicDialogComponent, {
      data: {
        title: 'Confermi?',
        content: `Sei sicuro di voler eliminare questo utente?`,
        actionDismiss: 'ANNULLA',
        actionConfirm: 'CONFERMA',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((confirmed) => {
          if (confirmed) {
            return this.utentiService.deleteUtente(id);
          } else {
            return of(null); // Restituisce un observable con valore null
          }
        })
      )
      .subscribe({
        next: () => {
          this._snackBar.open('Utente eliminato', 'OK', {
            duration: 3000,
          });
          this.loadData();
        },
        error: (err) => {
          const dialogRef = this._matDialog.open(DynamicDialogComponent, {
            data: {
              response: 'error',
              title: `Errore ${err.status}`,
              content: err.error,
              actionConfirm: 'OK',
            },
          });
        },
      });
  }

  handlePageChanged(event: PageEvent) {
    this.paginatorPageIndex = event.pageIndex;
    this.paginatorSize = event.pageSize;
    this.loadData();
  }

  handleSearch(filterValue: any) {
    this.utentiFilterResults = filterValue;
    this.handleSearchCalled = true;
    this.loadData();
  }
}
