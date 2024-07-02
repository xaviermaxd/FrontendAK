import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDesparasitacionComponent } from './nuevo-desparasitacion.component';

describe('NuevoDesparasitacionComponent', () => {
  let component: NuevoDesparasitacionComponent;
  let fixture: ComponentFixture<NuevoDesparasitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoDesparasitacionComponent]
    });
    fixture = TestBed.createComponent(NuevoDesparasitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
