import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P5jsComponent } from './p5js.component';

const routes: Routes = [{ path: '', component: P5jsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P5jsRoutingModule { }
