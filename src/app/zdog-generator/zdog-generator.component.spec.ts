import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdogGeneratorComponent } from './zdog-generator.component';

describe('ZdogGeneratorComponent', () => {
  let component: ZdogGeneratorComponent;
  let fixture: ComponentFixture<ZdogGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZdogGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZdogGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
