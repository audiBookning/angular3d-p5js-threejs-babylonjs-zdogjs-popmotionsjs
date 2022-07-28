import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZdogPopmotionRoutingModule } from './zdog-popmotion-routing.module';
import { ZdogPopmotionComponent } from './zdog-popmotion.component';

@NgModule({
  declarations: [ZdogPopmotionComponent],
  imports: [CommonModule, FormsModule, ZdogPopmotionRoutingModule],
})
export class ZdogPopmotionModule {}
