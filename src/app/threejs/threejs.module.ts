import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreejsRoutingModule } from './threejs-routing.module';
import { ThreejsComponent } from './threejs.component';


@NgModule({
  declarations: [
    ThreejsComponent
  ],
  imports: [
    CommonModule,
    ThreejsRoutingModule
  ]
})
export class ThreejsModule { }
