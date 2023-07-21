import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Optional,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Cliente } from 'src/app/core/dto/cliente.dto';
import { ClientiService } from 'src/app/core/services/clienti.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
})
export class ClientiComponent {
  constructor(
    private clientiService: ClientiService,
    private loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private dialogRef: MatDialogRef<DynamicDialogComponent>
  ) {}
  loggedUser: any = null;
  clientiColumns: string[] = [
    'nome',
    'cognome',
    'dataIscrizione',
    this.loggedUser ?? 'azioni',
  ];
  clientiSearchFilterForm!: FormGroup;
  clientiData$ = new BehaviorSubject<any>(null);
  paginatorPageIndex: number = 0;
  paginatorSize: number = 5;
  clientiFilterResults: any[] = [];
  // @ContentChild('clientiSearchTemplate') clientiSearchTemplate!: TemplateRef<any>;
  @ContentChild('clientiTableTemplate') clientiTableTemplate!: TemplateRef<any>;
  handleSearchCalled = false;

  ngOnInit(): void {
    this.loggedUser = this.loginService.userProfile$.value;

    this.clientiSearchFilterForm = new FormGroup({
      nome: new FormControl(''),
      cognome: new FormControl(''),
      dataIscrizione: new FormControl(''),
    });
    this.loadData();
  }

  loadData() {
    const pageIndex = this.handleSearchCalled ? 0 : this.paginatorPageIndex;

    this.clientiData$.next(this.clientiService.getClienti);

    // this.clientiService
    //   .getclienti(
    //     pageIndex,
    //     this.paginatorSize,
    //     ...Object.values(this.clientiFilterResults)
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.clientiData$.next(response);
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
    this.clientiFilterResults = filterValue;
    this.handleSearchCalled = true;
    this.loadData();
  }

  editCliente(data: Cliente) {
    // this.clientiService.editCliente$.next(data);
    // this.router.navigate(['/add-edit-user']);
  }

  deleteCliente(id: number) {
    // this.clientiService.deleteCliente(id).subscribe({
    //   next: () => {
    //     this.loadData();
    //   },
    // });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
