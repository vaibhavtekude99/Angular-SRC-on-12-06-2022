import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabDetailsComponent } from './slab-details.component';

describe('SlabDetailsComponent', () => {
  let component: SlabDetailsComponent;
  let fixture: ComponentFixture<SlabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlabDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
