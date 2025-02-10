import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturamentoPageComponent } from './faturamento-page.component';

describe('FaturamentoPageComponent', () => {
  let component: FaturamentoPageComponent;
  let fixture: ComponentFixture<FaturamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturamentoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
