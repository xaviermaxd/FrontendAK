import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVeterinarioComponent } from './editar-veterinario.component';

describe('EditarVeterinarioComponent', () => {
  let component: EditarVeterinarioComponent;
  let fixture: ComponentFixture<EditarVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVeterinarioComponent]
    });
    fixture = TestBed.createComponent(EditarVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
