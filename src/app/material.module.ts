import { NgModule } from '@angular/core';
import { MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class AppMaterialModule { }
