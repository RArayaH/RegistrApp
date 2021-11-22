import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AlumnosComponent],
  exports:[AlumnosComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentModule { }
