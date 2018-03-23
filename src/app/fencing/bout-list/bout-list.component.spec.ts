import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutListComponent } from './bout-list.component';

describe('BoutListComponent', () => {
  let component: BoutListComponent;
  let fixture: ComponentFixture<BoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
