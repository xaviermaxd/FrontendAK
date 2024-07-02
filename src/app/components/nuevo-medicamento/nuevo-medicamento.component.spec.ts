import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMedicamentoComponent } from './nuevo-medicamento.component';

describe('NuevoMedicamentoComponent', () => {
  let component: NuevoMedicamentoComponent;
  let fixture: ComponentFixture<NuevoMedicamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoMedicamentoComponent]
    });
    fixture = TestBed.createComponent(NuevoMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
