import { NgModule } from '@angular/core';

//material
import {
  MatSlideToggleModule,
  MatInputModule,
  MatRippleModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSlideToggleModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
