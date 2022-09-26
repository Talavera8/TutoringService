import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoringRequestCreateComponent } from './tutoring-request-create.component';

describe('TutoringRequestCreateComponent', () => {
  let component: TutoringRequestCreateComponent;
  let fixture: ComponentFixture<TutoringRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoringRequestCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoringRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
