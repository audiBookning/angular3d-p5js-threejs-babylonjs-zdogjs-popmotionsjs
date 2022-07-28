import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BabylonjsRoutingModule } from './babylonjs-routing.module';
import { BabylonjsComponent } from './babylonjs.component';


@NgModule({
  declarations: [
    BabylonjsComponent
  ],
  imports: [
    CommonModule,
    BabylonjsRoutingModule
  ]
})
export class BabylonjsModule { }
