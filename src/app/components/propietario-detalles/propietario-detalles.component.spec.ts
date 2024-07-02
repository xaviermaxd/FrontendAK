import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioDetallesComponent } from './propietario-detalles.component';

describe('PropietarioDetallesComponent', () => {
  let component: PropietarioDetallesComponent;
  let fixture: ComponentFixture<PropietarioDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioDetallesComponent]
    });
    fixture = TestBed.createComponent(PropietarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
