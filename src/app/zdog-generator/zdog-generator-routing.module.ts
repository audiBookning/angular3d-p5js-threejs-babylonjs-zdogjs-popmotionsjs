import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZdogGeneratorComponent } from './zdog-generator.component';

const routes: Routes = [{ path: '', component: ZdogGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZdogGeneratorRoutingModule { }
