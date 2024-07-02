import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVeterinarioComponent } from './nuevo-veterinario.component';

describe('NuevoVeterinarioComponent', () => {
  let component: NuevoVeterinarioComponent;
  let fixture: ComponentFixture<NuevoVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoVeterinarioComponent]
    });
    fixture = TestBed.createComponent(NuevoVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
