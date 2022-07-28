import chroma from 'chroma-js';
import * as Zdog from 'zdog';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { generateCube, Node, Object3d } from './shapes3dToolbox';

@Component({
  selector: 'app-zdog-generator',
  templateUrl: './zdog-generator.component.html',
  styleUrls: ['./zdog-generator.component.scss'],
})
export class ZdogGeneratorComponent implements AfterViewInit {
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
    //this.zdogBasicEllipse();
    // update & render
    this.genShape2();
    this.illo.updateRenderGraph();
    this.animate();
  }

  generateGraph() {
    if (this.mainshape) {
      this.mainshape.remove(); // drop all children before regeneration
    }
    /*  if (this.draw_mode_default == 'Wireframe') {
      this.mainshape = new Zdog.Shape({
        addTo: this.illo.r,
        path: genShape1(generateShape(shape_params)),
        color: this.default_color,
        closed: false,
        stroke: this.stroke_value,
        fill: false,
      });
    } else {
      this.mainshape = null;
      this.genShape2();
    } */
    this.genShape2();
  }

  // Wireframe shape
  /* genShape1(obj3d) {
    var datas = [];

    obj3d.polygons.forEach((vertices) => {
      vertices.forEach((item) => {
        datas.push(obj3d.points[item]);
      });
    });
    return datas;
  } */

  // filled shape
  genShape2() {
    const stroke_value = 1;
    var shape_params = { scale: 100 };
    var obj3d: Object3d = generateCube(shape_params);

    var colors = chroma
      .scale(['#9cdf7c', '#2A4858'])
      .mode('lch')
      .colors(obj3d.polygons.length);

    obj3d.polygons.forEach((vertices, idx) => {
      let shape: Node[] = [];
      vertices.forEach((item) => {
        shape.push(obj3d.points[item]);
      });

      new Zdog.Shape({
        addTo: this.illo,
        path: shape,
        color: colors[idx],
        closed: false,
        stroke: stroke_value,
        fill: true,
      });
    });
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
