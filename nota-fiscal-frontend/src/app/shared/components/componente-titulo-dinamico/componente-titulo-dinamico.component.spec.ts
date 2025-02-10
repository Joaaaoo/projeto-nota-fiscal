import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteTituloDinamicoComponent } from './componente-titulo-dinamico.component';

describe('ComponenteTituloDinamicoComponent', () => {
  let component: ComponenteTituloDinamicoComponent;
  let fixture: ComponentFixture<ComponenteTituloDinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteTituloDinamicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteTituloDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
