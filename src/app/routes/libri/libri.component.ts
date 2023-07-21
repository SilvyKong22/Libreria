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
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Libro } from 'src/app/core/dto/libro.dto';
import { LibriService } from 'src/app/core/services/libri.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-libri',
  templateUrl: './libri.component.html',
  styleUrls: ['./libri.component.scss'],
})
export class LibriComponent {
  constructor(
    private libriService: LibriService,
    private loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    @Optional() private dialogRef: MatDialogRef<DynamicDialogComponent>
  ) {}
  loggedUser: any = null;
  libriColumns: string[] = [
    'titolo',
    'autore',
    'genere',
    this.loggedUser ?? 'azioni',
  ];
  libriSearchFilterForm!: FormGroup;
  libriData$ = new BehaviorSubject<any>(null);
  paginatorPageIndex: number = 0;
  paginatorSize: number = 5;
  libriFilterResults: any[] = [];
  // @ContentChild('libriSearchTemplate') libriSearchTemplate!: TemplateRef<any>;
  @ContentChild('libriTableTemplate') libriTableTemplate!: TemplateRef<any>;
  @Output() selectedLibroEmitted = new EventEmitter<any>();
  handleSearchCalled = false;
  dialogOpen = false;

  ngOnInit(): void {
    if (this.dialogRef) {
      this.dialogOpen = true;
    }

    this.loggedUser = this.loginService.userProfile$.value;

    this.libriSearchFilterForm = new FormGroup({
      titolo: new FormControl(''),
      autore: new FormControl(''),
      genere: new FormControl(''),
    });
    this.loadData();
  }

  loadData() {
    const pageIndex = this.handleSearchCalled ? 0 : this.paginatorPageIndex;

    this.libriData$.next(this.libriService.getLibri);

    // this.libriService
    //   .getLibri(
    //     pageIndex,
    //     this.paginatorSize,
    //     ...Object.values(this.libriFilterResults)
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.libriData$.next(response);
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
    this.libriFilterResults = filterValue;
    this.handleSearchCalled = true;
    this.loadData();
  }

  selectedLibro(id: any) {
    this.selectedLibroEmitted.next(id);
  }

  editLibro(data: Libro) {
    // this.libriService.editLibro$.next(data);
    // this.router.navigate(['/add-edit-user']);
  }

  deleteLibro(id: number) {
    // this.libriService.deleteLibro(id).subscribe({
    //   next: () => {
    //     this.loadData();
    //   },
    // });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
