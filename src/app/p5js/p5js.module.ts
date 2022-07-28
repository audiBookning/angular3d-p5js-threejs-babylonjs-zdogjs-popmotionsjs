import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { P5jsRoutingModule } from './p5js-routing.module';
import { P5jsComponent } from './p5js.component';

@NgModule({
  declarations: [P5jsComponent],
  imports: [CommonModule, FormsModule, P5jsRoutingModule],
})
export class P5jsModule {}
