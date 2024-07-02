import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoDetallesComponent } from './medicamento-detalles.component';

describe('MedicamentoDetallesComponent', () => {
  let component: MedicamentoDetallesComponent;
  let fixture: ComponentFixture<MedicamentoDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoDetallesComponent]
    });
    fixture = TestBed.createComponent(MedicamentoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
