import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BabylonjsComponent } from './babylonjs.component';

const routes: Routes = [{ path: '', component: BabylonjsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BabylonjsRoutingModule { }
