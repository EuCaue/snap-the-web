import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapOptionsComponent } from './snap-options.component';

describe('SnapOptionsComponent', () => {
  let component: SnapOptionsComponent;
  let fixture: ComponentFixture<SnapOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
