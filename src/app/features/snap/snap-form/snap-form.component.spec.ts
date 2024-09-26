import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapFormComponent } from './snap-form.component';

describe('SnapFormComponent', () => {
  let component: SnapFormComponent;
  let fixture: ComponentFixture<SnapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
