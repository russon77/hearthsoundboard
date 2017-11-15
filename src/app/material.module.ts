import { NgModule } from '@angular/core';
import { MatInputModule, MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class AppMaterialModule { }
