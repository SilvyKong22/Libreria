import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Cliente } from 'src/app/core/dto/cliente.dto';
import { ClientiService } from 'src/app/core/services/clienti.service';

@Component({
  selector: 'app-add-edit-prenotazione',
  templateUrl: './add-edit-prenotazione.component.html',
  styleUrls: ['./add-edit-prenotazione.component.scss'],
})
export class AddEditPrenotazioneComponent {
  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private clientiService: ClientiService,
    private router: Router
  ) {}

  prenotazioneForm!: FormGroup;
  prenotazioneFormGroup!: FormGroup;
  prenotazioneFormArray!: FormArray;
  // requestObjectsArray: any[] = [];
  utenteToEdit: any = null;
  editMode: boolean = false;
  clienti!: Cliente[];
  firstPrenotazioneFilled: boolean = false;

  ngOnInit(): void {
    this.clienti = this.clientiService.getClienti.content;

    this.initForm();

    this.prenotazioneForm.valueChanges.subscribe({
      next: () => {
        if (this.prenotazioneForm.valid) {
          this.firstPrenotazioneFilled = true;
        } else {
          this.firstPrenotazioneFilled = false;
        }
      },
    });
  }

  initForm() {
    this.prenotazioneForm = this.fb.group({
      prenotazioni: this.fb.array([]),
    });

    this.addPrenotazione();
  }

  addPrenotazione() {
    this.prenotazioneFormArray = this.prenotazioneForm.get(
      'prenotazioni'
    ) as FormArray;

    this.prenotazioneFormArray.push(
      this.fb.group({
        titolo: [{ value: '', disabled: true }, Validators.required],
        autore: [{ value: '', disabled: true }, Validators.required],
        genere: [{ value: '', disabled: true }, Validators.required],
        libro: ['', Validators.required],
        cliente: ['', Validators.required],
        dataPrenotazione: ['', Validators.required],
        dataRestituzione: ['', Validators.required],
      })
    );
  }

  removePrenotazione(index: number) {
    this.prenotazioneFormArray.removeAt(index);
  }

  get prenotazioni() {
    // a getter!
    return (<FormArray>this.prenotazioneForm.get('prenotazioni')).controls;
  }

  onSubmit() {
    if (this.prenotazioneForm.valid) {
      const requestObjectsArray = this.prenotazioneFormArray.value;
      requestObjectsArray.map((prenotazione: any) => {
        const formattedDate = new Date(prenotazione.dataPrenotazione);
        formattedDate.setDate(
          formattedDate.getDate() + Number(prenotazione.dataRestituzione)
        );
        prenotazione.dataRestituzione = formattedDate;
        // NOTA: **********.toISOString()
        // prenotazione.dataPrenotazione =
        //   prenotazione.dataPrenotazione.toISOString();

        return prenotazione;
      });
    } else {
      alert('Controlla bene i campi in rosso!');
    }
  }

  openDialog(index: number) {
    const dialogRef = this.matDialog.open(DynamicDialogComponent, {
      data: {
        title: 'Ricerca un libro',
        selectingLibro: true,
      },
    });
    dialogRef.afterClosed().subscribe((libroSelected) => {
      this.prenotazioneForm
        .get('prenotazioni')
        ?.get(String(index))
        ?.patchValue({
          ...libroSelected,
          libro: libroSelected.id,
        });
    });
  }

  onCancel() {
    // this.utentiService.editUtente$.next(null);
    this.router.navigate(['/prenotazioni']);
    this.prenotazioneForm.reset();
  }
}
