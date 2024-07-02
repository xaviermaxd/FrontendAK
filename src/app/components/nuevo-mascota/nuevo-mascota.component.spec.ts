import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMascotaComponent } from './nuevo-mascota.component';

describe('NuevoMascotaComponent', () => {
  let component: NuevoMascotaComponent;
  let fixture: ComponentFixture<NuevoMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoMascotaComponent]
    });
    fixture = TestBed.createComponent(NuevoMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
