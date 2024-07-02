import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMedicaDetallesComponent } from './consulta-medica-detalles.component';

describe('ConsultaMedicaDetallesComponent', () => {
  let component: ConsultaMedicaDetallesComponent;
  let fixture: ComponentFixture<ConsultaMedicaDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaMedicaDetallesComponent]
    });
    fixture = TestBed.createComponent(ConsultaMedicaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
