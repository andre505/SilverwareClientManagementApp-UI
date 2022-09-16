import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopingThroughJsonComponent } from './looping-through-json.component';

describe('LoopingThroughJsonComponent', () => {
  let component: LoopingThroughJsonComponent;
  let fixture: ComponentFixture<LoopingThroughJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoopingThroughJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoopingThroughJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
