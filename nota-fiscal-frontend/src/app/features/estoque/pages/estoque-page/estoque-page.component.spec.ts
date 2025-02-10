import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquePageComponent } from './estoque-page.component';

describe('EstoquePageComponent', () => {
  let component: EstoquePageComponent;
  let fixture: ComponentFixture<EstoquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoquePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
