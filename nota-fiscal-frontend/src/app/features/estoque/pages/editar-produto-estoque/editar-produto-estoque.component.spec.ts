import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutoEstoqueComponent } from './editar-produto-estoque.component';

describe('EditarProdutoEstoqueComponent', () => {
  let component: EditarProdutoEstoqueComponent;
  let fixture: ComponentFixture<EditarProdutoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProdutoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
