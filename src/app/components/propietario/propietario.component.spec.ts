import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioComponent } from './propietario.component';

describe('PropietarioComponent', () => {
  let component: PropietarioComponent;
  let fixture: ComponentFixture<PropietarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioComponent]
    });
    fixture = TestBed.createComponent(PropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
