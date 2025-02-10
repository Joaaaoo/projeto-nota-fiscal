import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProdutoEstoqueComponent } from './adicionar-produto-estoque.component';

describe('AdicionarProdutoEstoqueComponent', () => {
  let component: AdicionarProdutoEstoqueComponent;
  let fixture: ComponentFixture<AdicionarProdutoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarProdutoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
