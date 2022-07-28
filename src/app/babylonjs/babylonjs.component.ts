import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as BABYLON from '@babylonjs/core';

@Component({
  selector: 'app-babylonjs',
  templateUrl: './babylonjs.component.html',
  styleUrls: ['./babylonjs.component.scss'],
})
export class BabylonjsComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  engine: BABYLON.Engine | undefined;
  scene: BABYLON.Scene | undefined;

  constructor() {}
  ngAfterViewInit(): void {
    this.engine = new BABYLON.Engine(this.canvas.nativeElement, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.initBabylon();
    this.engine.runRenderLoop(this.runRenderLoop.bind(this));
  }

  runRenderLoop() {
    if (!this.scene) return;
    this.scene.render();
  }

  initBabylon() {
    if (!this.scene) return;
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      -Math.PI / 2,
      Math.PI / 4,
      10,
      BABYLON.Vector3.Zero()
    );
    camera.attachControl(this.canvas.nativeElement, true);

    const light1 = new BABYLON.DirectionalLight(
      'DirectionalLight',
      new BABYLON.Vector3(0, -1, 1),
      this.scene
    );
    const light2 = new BABYLON.HemisphericLight(
      'HemiLight',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light1.intensity = 0.75;
    light2.intensity = 0.5;

    const box = BABYLON.MeshBuilder.CreateBox('box', {});
    box.position.x = 2;

    const frameRate = 10;

    const xSlide = new BABYLON.Animation(
      'xSlide',
      'position.x',
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: 0,
      value: 2,
    });

    keyFrames.push({
      frame: frameRate,
      value: -2,
    });

    keyFrames.push({
      frame: 2 * frameRate,
      value: 2,
    });

    xSlide.setKeys(keyFrames);

    box.animations.push(xSlide);

    const myAnim = this.scene.beginAnimation(box, 0, 2 * frameRate, true);

    setTimeout(() => {
      myAnim.stop();
    }, 5000);
  }
}
