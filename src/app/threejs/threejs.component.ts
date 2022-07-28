import * as THREE from 'three';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss'],
})
export class ThreejsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) threeJsDiv!: ElementRef<HTMLElement>;
  sectionWidth: number = 400;
  sectionHeight: number = 400;
  geometry: THREE.BoxGeometry | undefined;
  material: THREE.MeshBasicMaterial | undefined;

  renderer: THREE.WebGLRenderer | undefined;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> | undefined;
  scene: THREE.Scene | undefined;
  camera: THREE.PerspectiveCamera | undefined;

  constructor(private ngRenderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.initThreeJs();
  }
  ngOnDestroy(): void {
    if (
      this.geometry &&
      this.material &&
      this.cube &&
      this.scene &&
      this.camera &&
      this.renderer
    ) {
      this.scene.remove(this.cube);
      this.renderer.dispose();
      this.geometry.dispose();
      this.material.dispose();
    }
  }

  initThreeJs() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.ngRenderer.appendChild(
      this.threeJsDiv.nativeElement,
      this.renderer.domElement
    );
    // document.body.appendChild(renderer.domElement);
    // this.threeJsDiv.nativeElement.appendChild(this.renderer.domElement);
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;
    this.animate();
    //this.renderer.setAnimationLoop(this.render.bind(this));
  }

  //Create an render loop to allow animation
  render() {
    if (!this.cube || !this.renderer || !this.scene || !this.camera) return;
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}
