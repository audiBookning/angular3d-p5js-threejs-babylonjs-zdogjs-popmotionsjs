import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZdogPopmotionComponent } from './zdog-popmotion.component';

const routes: Routes = [{ path: '', component: ZdogPopmotionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZdogPopmotionRoutingModule { }
