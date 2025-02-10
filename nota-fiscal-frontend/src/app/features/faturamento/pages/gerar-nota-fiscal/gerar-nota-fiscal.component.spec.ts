import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarNotaFiscalComponent } from './gerar-nota-fiscal.component';

describe('GerarNotaFiscalComponent', () => {
  let component: GerarNotaFiscalComponent;
  let fixture: ComponentFixture<GerarNotaFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerarNotaFiscalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarNotaFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
