import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarNotaFiscalComponent } from './visualizar-nota-fiscal.component';

describe('VisualizarNotaFiscalComponent', () => {
  let component: VisualizarNotaFiscalComponent;
  let fixture: ComponentFixture<VisualizarNotaFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarNotaFiscalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarNotaFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
