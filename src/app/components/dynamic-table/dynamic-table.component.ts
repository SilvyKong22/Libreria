import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { API_Response } from 'src/app/core/dto/API_response.dto';
import { Utente } from 'src/app/core/dto/utente.dto';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent
  implements AfterViewInit, AfterContentChecked
{
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  @Input() loggedUser: any = null;
  @Input() displayedColumns!: string[];
  @Input() template!: TemplateRef<any>;
  @Input() dataResponse$!: BehaviorSubject<API_Response<Utente>>;
  @Input() filterResults: any;
  @Output() pageChanged: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  dataSource!: MatTableDataSource<Utente>;
  filterValue!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataResponse$.subscribe({
      next: (response) => {
        this.handleTable(response);
      },
    });
  }

  getFilterValueKeys(): string[] {
    return Object.keys(this.filterResults);
  }

  handleTable(response: API_Response<Utente>) {
    if (response) {
      this.paginator.length = response.totalElements;
      this.paginator.pageSize = response.size;
      this.paginator.pageIndex = response.number;
      this.dataSource = new MatTableDataSource(response.content);
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageChanged.emit(pageEvent);
  }

  replaceFirstUppercaseWithSpace(str: string) {
    let modifiedStr = str.replace(/([A-Z])/g, ' $1');
    return modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
