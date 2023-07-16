import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recuperar3Component } from './recuperar3.component';

describe('Recuperar3Component', () => {
  let component: Recuperar3Component;
  let fixture: ComponentFixture<Recuperar3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Recuperar3Component]
    });
    fixture = TestBed.createComponent(Recuperar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
