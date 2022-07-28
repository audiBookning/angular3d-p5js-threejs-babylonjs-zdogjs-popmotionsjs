import * as Zdog from 'zdog';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-zdog',
  templateUrl: './zdog.component.html',
  styleUrls: ['./zdog.component.scss'],
})
export class ZdogComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  zdogCanvas!: ElementRef<HTMLCanvasElement>;
  illo!: Zdog.Illustration;
  mainshape: Zdog.Shape | null = null; // pointer to the wireframe shape (when it's activated)

  // Constants
  draw_modes = ['Wireframe', 'Paint'];
  draw_mode_default = this.draw_modes[1];
  default_color = '#000000'; // color picker : https://www.w3schools.com/colors/colors_picker.asp
  stroke_value = 1;
  spin_modes = ['Spinning', 'Static'];
  spin_mode_default = this.spin_modes[0];
  isSpinning = true;

  constructor() {}

  ngAfterViewInit(): void {
    let isSpinning = this.isSpinning;

    this.zdogCanvas.nativeElement.width = 400;
    this.zdogCanvas.nativeElement.height = 400;

    this.illo = new Zdog.Illustration({
      // set canvas with selector
      element: this.zdogCanvas.nativeElement,
      dragRotate: true,
      zoom: 0.6,
      // stop rotation when dragging starts
      onDragStart: function () {
        isSpinning = false;
      },
      onDragEnd: function () {
        isSpinning = true;
      },
    });

    let box = new Zdog.Box({
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
    this.animate();
  }

  draw() {
    if (this.isSpinning) {
      this.illo.rotate.z += 0.003;
    }
    this.illo.updateRenderGraph();
  }

  animate() {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}
