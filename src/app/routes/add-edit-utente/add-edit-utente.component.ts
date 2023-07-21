import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { UtentiService } from 'src/app/core/services/utenti.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit-utente.component.html',
  styleUrls: ['./add-edit-utente.component.scss'],
})
export class AddEditUtente implements OnInit, AfterViewInit {
  utenteForm!: FormGroup;
  utenteToEdit: any = null;
  editMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private utentiService: UtentiService,
    private router: Router,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.utenteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ruolo: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.utenteToEdit = { ...this.utentiService.editUtente$.value };
      this.editMode = Object.keys(this.utenteToEdit).length > 0;
      this.utenteForm.patchValue({
        ...this.utenteToEdit,
      });
    });
  }

  onSubmit() {
    if (this.utenteForm.valid) {
      this.utenteForm.patchValue({
        ...this.utenteForm.value,
      });

      if (this.utenteToEdit && this.editMode) {
        const dialogRef = this._matDialog.open(DynamicDialogComponent, {
          data: {
            title: 'Confermi?',
            content: `Sei sicuro di voler modificare i dati di ${this.utenteToEdit.nome} ${this.utenteToEdit.cognome}?`,
            actionDismiss: 'ANNULLA',
            actionConfirm: 'CONFERMA',
          },
        });
        dialogRef
          .afterClosed()
          .pipe(
            switchMap((confirmed) => {
              if (confirmed) {
                return this.utentiService.editUtente(
                  this.utenteToEdit.id,
                  this.utenteForm.value
                );
              } else {
                return of(null); // Restituisce un observable con valore null
              }
            })
          )
          .subscribe({
            next: (res) => {
              if (res !== null) {
                this._snackBar.open(
                  'Utente ' +
                    this.utenteToEdit.nome +
                    ' ' +
                    this.utenteToEdit.cognome +
                    ' modificato',
                  'OK',
                  {
                    duration: 3000,
                  }
                );
                this.router.navigate(['/utenti']);
                this.utentiService.editUtente$.next(null);
              }
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
      } else {
        this.utentiService.addUtente(this.utenteForm.value).subscribe({
          next: (res) => {
            this._snackBar.open('Nuovo utente aggiunto', 'OK', {
              duration: 3000,
            });
            this.router.navigate(['/utenti']);
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
    }
  }

  onCancel() {
    this.utentiService.editUtente$.next(null);
    this.router.navigate(['/utenti']);
    this.utenteForm.reset();
  }
}
