import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapPreviewComponent } from './snap-preview.component';

describe('SnapPreviewComponent', () => {
  let component: SnapPreviewComponent;
  let fixture: ComponentFixture<SnapPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
