import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Prenotazione } from 'src/app/core/dto/prenotazione.dto';
import { LoginService } from 'src/app/core/services/login.service';
import { PrenotazioniService } from 'src/app/core/services/prenotazioni.service';
import { UtentiService } from 'src/app/core/services/utenti.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss'],
})
export class PrenotazioniComponent {
  constructor(
    private prenotazioniService: PrenotazioniService,
    private loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}
  loggedUser: any = null;
  prenotazioniColumns: string[] = [
    'titolo',
    'autore',
    'cliente',
    'status',
    'dataPrenotazione',
    'dataRestituzione',
    this.loggedUser ?? 'azioni',
  ];
  prenotazioniSearchFilterForm!: FormGroup;
  prenotazioniData$ = new BehaviorSubject<any>(null);
  prenotazioniSearchFilters!: FormGroup;
  paginatorPageIndex: number = 0;
  paginatorSize: number = 5;
  prenotazioniFilterResults: any[] = [];

  @ContentChild('prenotazioniTable') prenotazioniTable!: TemplateRef<any>;
  handleSearchCalled = false;

  ngOnInit(): void {
    this.loggedUser = this.loginService.userProfile$.value;

    this.prenotazioniSearchFilters = new FormGroup({
      titolo: new FormControl(''),
      autore: new FormControl(''),
      cliente: new FormControl(''),
      status: new FormControl(''),
      dataPrenotazione: new FormControl(''),
      dataRestituzione: new FormControl(''),
    });

    this.loadData();
  }
  loadData() {
    const pageIndex = this.handleSearchCalled ? 0 : this.paginatorPageIndex;

    this.prenotazioniData$.next(this.prenotazioniService.getPrenotazioni);

    // this.prenotazioniService
    //   .getprenotazioni(
    //     pageIndex,
    //     this.paginatorSize,
    //     ...Object.values(this.prenotazioniFilterResults)
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.prenotazioniData$.next(response);
    //     },
    //   });
  }

  handlePageChanged(event: PageEvent) {
    console.log(event);

    this.paginatorPageIndex = event.pageIndex;
    this.paginatorSize = event.pageSize;
    this.loadData();
  }

  handleSearch(filterValue: any) {
    this.prenotazioniFilterResults = filterValue;
    this.handleSearchCalled = true;
    this.loadData();
  }

  editPrenotazione(data: Prenotazione) {
    // this.prenotazioniService.editPrenotazione$.next(data);
    // this.router.navigate(['/add-edit-user']);
  }

  deletePrenotazione(id: number) {
    // this.prenotazioniService.deletePrenotazione(id).subscribe({
    //   next: () => {
    //     this.loadData();
    //   },
    // });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
