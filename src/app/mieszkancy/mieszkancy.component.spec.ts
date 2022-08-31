import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MieszkancyComponent } from './mieszkancy.component';

describe('MieszkancyComponent', () => {
  let component: MieszkancyComponent;
  let fixture: ComponentFixture<MieszkancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MieszkancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MieszkancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
