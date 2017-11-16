import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
