import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeDetectComponent } from './size-detect.component';

describe('SizeDetectComponent', () => {
  let component: SizeDetectComponent;
  let fixture: ComponentFixture<SizeDetectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeDetectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
