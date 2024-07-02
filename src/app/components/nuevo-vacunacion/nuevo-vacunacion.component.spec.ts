import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVacunacionComponent } from './nuevo-vacunacion.component';

describe('NuevoVacunacionComponent', () => {
  let component: NuevoVacunacionComponent;
  let fixture: ComponentFixture<NuevoVacunacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoVacunacionComponent]
    });
    fixture = TestBed.createComponent(NuevoVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
