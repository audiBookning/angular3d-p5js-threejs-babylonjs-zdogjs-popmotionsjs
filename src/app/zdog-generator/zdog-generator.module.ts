import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZdogGeneratorRoutingModule } from './zdog-generator-routing.module';
import { ZdogGeneratorComponent } from './zdog-generator.component';


@NgModule({
  declarations: [
    ZdogGeneratorComponent
  ],
  imports: [
    CommonModule,
    ZdogGeneratorRoutingModule
  ]
})
export class ZdogGeneratorModule { }
