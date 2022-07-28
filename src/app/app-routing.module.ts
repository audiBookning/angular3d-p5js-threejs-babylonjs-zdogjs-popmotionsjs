import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'p5js',
    loadChildren: () => import('./p5js/p5js.module').then((m) => m.P5jsModule),
  },
  {
    path: 'babylonjs',
    loadChildren: () =>
      import('./babylonjs/babylonjs.module').then((m) => m.BabylonjsModule),
  },
  {
    path: 'threejs',
    loadChildren: () =>
      import('./threejs/threejs.module').then((m) => m.ThreejsModule),
  },
  { path: 'zdog', loadChildren: () => import('./zdog/zdog.module').then(m => m.ZdogModule) },
  { path: 'zdog-generator', loadChildren: () => import('./zdog-generator/zdog-generator.module').then(m => m.ZdogGeneratorModule) },
  { path: 'zdog-popmotion', loadChildren: () => import('./zdog-popmotion/zdog-popmotion.module').then(m => m.ZdogPopmotionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
