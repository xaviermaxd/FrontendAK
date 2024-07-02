import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoConsultaMedicaComponent } from './nuevo-consulta-medica.component';

describe('NuevoConsultaMedicaComponent', () => {
  let component: NuevoConsultaMedicaComponent;
  let fixture: ComponentFixture<NuevoConsultaMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoConsultaMedicaComponent]
    });
    fixture = TestBed.createComponent(NuevoConsultaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
