import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Libro } from 'src/app/core/dto/libro.dto';
import { LibriService } from 'src/app/core/services/libri.service';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
})
export class DynamicDialogComponent {
  constructor(
    private libriService: LibriService,
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.disableClose = true;
  }
  selectedLibro!: any;

  selectedLibroID(id: any) {
    this.selectedLibro = this.libriService.getLibri.content.find((libro) => {
      return libro.id === id;
    });
  }
}
