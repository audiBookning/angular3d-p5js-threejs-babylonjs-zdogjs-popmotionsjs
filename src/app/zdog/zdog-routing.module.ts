import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZdogComponent } from './zdog.component';

const routes: Routes = [{ path: '', component: ZdogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZdogRoutingModule { }
