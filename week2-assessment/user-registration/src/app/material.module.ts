import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
//Form
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
//moment module for date-time
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

const MODULES = [
    MatToolbarModule,MatButtonModule,
    MatFormFieldModule,MatInputModule,
    FormsModule,MatRadioModule,
    MatIconModule,MatSliderModule,
    MatDatepickerModule,MatMomentDateModule,
    MatListModule,MatCardModule
]

@NgModule({
imports: MODULES,
exports: MODULES
})
//give Name MaterialModule to import in app.modules.ts
export class MaterialModule{}