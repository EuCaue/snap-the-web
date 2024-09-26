import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapPageComponent } from './snap-page.component';

describe('SnapPageComponent', () => {
  let component: SnapPageComponent;
  let fixture: ComponentFixture<SnapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
