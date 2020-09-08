import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMassComponent } from './choose-mass.component';

describe('ChooseMassComponent', () => {
  let component: ChooseMassComponent;
  let fixture: ComponentFixture<ChooseMassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
