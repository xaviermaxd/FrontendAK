import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioDetallesComponent } from './veterinario-detalles.component';

describe('VeterinarioDetallesComponent', () => {
  let component: VeterinarioDetallesComponent;
  let fixture: ComponentFixture<VeterinarioDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioDetallesComponent]
    });
    fixture = TestBed.createComponent(VeterinarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
