import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionComponent } from './paginacion.component';

describe('PaginacionComponent', () => {
  let component: PaginacionComponent;
  let fixture: ComponentFixture<PaginacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginacionComponent]
    });
    fixture = TestBed.createComponent(PaginacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
