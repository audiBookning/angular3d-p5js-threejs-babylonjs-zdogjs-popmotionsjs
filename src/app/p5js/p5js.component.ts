import * as p5 from 'p5';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

interface extendElement extends p5.Element {
  changed?: Function;
}

@Component({
  selector: 'app-p5js',
  templateUrl: './p5js.component.html',
  styleUrls: ['./p5js.component.scss'],
})
export class P5jsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) p5Div!: ElementRef<HTMLElement>;
  sectionWidth: number = 400;
  sectionHeight: number = 400;
  p5Instance!: p5;
  p5jsInput2: string = 'initial value';
  p5jsInput: string = 'initial value';

  constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.p5Instance = new p5(this.sketch.bind(this), this.p5Div.nativeElement);
  }

  // a closure that can set optional preload(), setup(), and/or draw() properties
  // on the given p5 instance
  sketch(s: p5) {
    const width = 400;
    const height = 400;
    let input: extendElement;

    // The statements in the setup() function
    // execute once when the program begins
    s.setup = () => {
      s.createCanvas(width, height, s.WEBGL);
      input = s.createInput();
      input.position(20, 65);
      if (input.changed) {
        input.changed(this.changeInput(input));
      }
    };

    s.draw = () => {
      s.background(255, 170, 200);

      //s.translate(-width / 2, -height / 2, 0); //moves our drawing origin to the top left corner
      cube(50, 255);
    };

    const cube = (size: number, color: number) => {
      s.noFill();
      //small box
      s.stroke(color);
      s.rotateX(s.frameCount * 0.02);
      s.rotateY(s.frameCount * 0.02);
      s.box(size, size, size);
    };

    const redChanged = (input: any) => {
      //return this.changeInput(input);
    };
  }

  changeInput(input: any) {
    return () => {
      this.p5jsInput = input.value();
    };
  }

  ngOnDestroy() {
    this.p5Instance.remove();
  }
}
