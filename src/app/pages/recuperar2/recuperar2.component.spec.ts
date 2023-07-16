import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recuperar2Component } from './recuperar2.component';

describe('Recuperar2Component', () => {
  let component: Recuperar2Component;
  let fixture: ComponentFixture<Recuperar2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Recuperar2Component]
    });
    fixture = TestBed.createComponent(Recuperar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
