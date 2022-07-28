import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZdogRoutingModule } from './zdog-routing.module';
import { ZdogComponent } from './zdog.component';


@NgModule({
  declarations: [
    ZdogComponent
  ],
  imports: [
    CommonModule,
    ZdogRoutingModule
  ]
})
export class ZdogModule { }
