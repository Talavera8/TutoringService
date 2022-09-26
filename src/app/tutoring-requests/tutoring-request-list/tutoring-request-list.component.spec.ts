import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoringRequestListComponent } from './tutoring-request-list.component';

describe('TutoringRequestListComponent', () => {
  let component: TutoringRequestListComponent;
  let fixture: ComponentFixture<TutoringRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoringRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoringRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
