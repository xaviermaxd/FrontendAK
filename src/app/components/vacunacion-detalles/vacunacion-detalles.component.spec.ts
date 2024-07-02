import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionDetallesComponent } from './vacunacion-detalles.component';

describe('VacunacionDetallesComponent', () => {
  let component: VacunacionDetallesComponent;
  let fixture: ComponentFixture<VacunacionDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacunacionDetallesComponent]
    });
    fixture = TestBed.createComponent(VacunacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
