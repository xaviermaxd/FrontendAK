import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPropietarioComponent } from './nuevo-propietario.component';

describe('NuevoPropietarioComponent', () => {
  let component: NuevoPropietarioComponent;
  let fixture: ComponentFixture<NuevoPropietarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoPropietarioComponent]
    });
    fixture = TestBed.createComponent(NuevoPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
