import {
  animate,
  anticipate,
  backIn,
  backInOut,
  backOut,
  circIn,
  circInOut,
  circOut,
  easeIn,
  easeInOut,
  easeOut,
  Easing,
  linear,
} from 'popmotion';
import * as Zdog from 'zdog';

import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';

interface EasingHash {
  name: string;
  fn: Easing;
}

@Component({
  selector: 'app-zdog-popmotion',
  templateUrl: './zdog-popmotion.component.html',
  styleUrls: ['./zdog-popmotion.component.scss'],
})
export class ZdogPopmotionComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  zdogCanvas!: ElementRef<HTMLCanvasElement>;

  //Zdog
  illo!: Zdog.Illustration;
  mainshape: Zdog.Shape | null = null; // pointer to the wireframe shape (when it's activated)

  // Zdog - Constants, flags and variables
  draw_modes = ['Wireframe', 'Paint'];
  draw_mode_default = this.draw_modes[1];
  default_color = '#000000'; // color picker : https://www.w3schools.com/colors/colors_picker.asp
  stroke_value = 1;
  spin_modes = ['Spinning', 'Static'];
  spin_mode_default = this.spin_modes[0];
  isSpinning = false;

  // Popmotion
  testPopmotion: string = 'testPopmotion';
  playback: {
    stop: () => void;
  } | null = null;

  // Popmotion - Constants, flags and variables
  numberRotations = 1;
  animeTo = Zdog.TAU * this.numberRotations;
  timeDuration = this.numberRotations * 1000;

  // Popmotion - select tweens
  selectedTween: Easing = linear;
  tweens: EasingHash[] = [
    { name: 'linear', fn: linear },
    { name: 'easeIn', fn: easeIn },
    { name: 'easeOut', fn: easeOut },
    { name: 'easeInOut', fn: easeInOut },
    { name: 'circIn', fn: circIn },
    { name: 'circOut', fn: circOut },
    { name: 'circInOut', fn: circInOut },
    { name: 'backIn', fn: backIn },
    { name: 'backOut', fn: backOut },
    { name: 'backInOut', fn: backInOut },
    { name: 'anticipate', fn: anticipate },
    //{'cubicBezier': cubicBezier},
  ];

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zdogCanvas.nativeElement.width = 400;
    this.zdogCanvas.nativeElement.height = 400;

    this.illo = new Zdog.Illustration({
      // set canvas with selector
      element: this.zdogCanvas.nativeElement,
      dragRotate: true,
      zoom: 0.6,
      // stop rotation when dragging starts
      onDragStart: () => {
        this.isSpinning = true;
        this.animateRAF();
      },
      onDragEnd: () => {
        this.isSpinning = false;
      },
    });

    new Zdog.Box({
      addTo: this.illo,
      width: 120,
      height: 100,
      depth: 80,
      stroke: false,
      color: '#C25', // default face color
      leftFace: '#EA0',
      rightFace: '#E62',
      topFace: '#ED0',
      bottomFace: '#636',
    });

    this.illo.updateRenderGraph();
    //this.animateRAF();
  }

  beginAnimation() {
    if (this.playback) {
      this.playback.stop();
      this.isSpinning = false;
    }

    if (!this.isSpinning) {
      this.zone.run(() => {
        this.playback = animate({
          to: this.animeTo,
          duration: this.timeDuration,
          ease: this.selectedTween,
          repeat: 2,
          //repeatDelay: 200,
          onUpdate: (latest: number) => {
            this.illo.rotate.z = latest % Zdog.TAU;
            this.illo.updateRenderGraph();
          },
          onComplete: () => {
            this.isSpinning = false;
          },
        });
        this.isSpinning = true;
      });
    }
  }

  /* draw(rafId: number | null) {
    if (this.isSpinning) {
      this.illo.rotate.z += 0.003;
      //x = z / 1000
    } else if (rafId) {
      cancelAnimationFrame(rafId);
    }
    this.illo.updateRenderGraph();
  } */

  animateRAF() {
    let rafId: number | null = null;
    this.illo.updateRenderGraph();
    if (!this.isSpinning && rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(this.animateRAF.bind(this));
  }
}
