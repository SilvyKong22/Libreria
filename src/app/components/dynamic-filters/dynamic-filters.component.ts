import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.scss'],
})
export class DynamicFiltersComponent implements OnInit {
  @Input() searchFilterForm!: FormGroup;
  // @Input() template!: TemplateRef<any>;
  @Input() templateName!: string;
  @Output() searchEmitted = new EventEmitter<{}>();

  getFilterControls(): string[] {
    return Object.keys(this.searchFilterForm.controls);
  }

  ngOnInit(): void {
    this.searchFilterForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((filterValue) => {
          const formattedFilterValue = { ...filterValue };

          for (const key in formattedFilterValue) {
            if (formattedFilterValue.hasOwnProperty(key)) {
              if (formattedFilterValue[key] instanceof Date) {
                formattedFilterValue[key] = formatDate(
                  formattedFilterValue[key],
                  'dd-MM-yyyy',
                  'en-US'
                );
              }
            }
          }

          return formattedFilterValue;
        })
      )
      .subscribe((response) => {
        this.searchEmitted.next(response);
      });
  }

  replaceFirstUppercaseWithSpace(str: string) {
    let modifiedStr = str.replace(/([A-Z])/g, ' $1');
    return modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
  }
}
