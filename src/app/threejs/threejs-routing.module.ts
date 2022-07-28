import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreejsComponent } from './threejs.component';

const routes: Routes = [{ path: '', component: ThreejsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejsRoutingModule { }
