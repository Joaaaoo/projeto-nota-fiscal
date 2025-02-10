// filepath: /c:/Users/joao/Desktop/projeto-nota-fiscal/nota-fiscal-frontend/src/app/features/estoque/services/estoque.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from '../models/produto.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private ESTOQUE_SERVICE_URL = `${environment.ESTOQUE_SERVICE_URL}/Produtos`;

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.ESTOQUE_SERVICE_URL).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produtos', error);
        return throwError(error);
      })
    );
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.ESTOQUE_SERVICE_URL, produto).pipe(
      catchError((error) => {
        console.error('Erro ao adicionar produto', error);
        return throwError(error);
      })
    );
  }

  atualizarProduto(id: number, produto: any): Observable<Produto> {
    return this.http
      .put<Produto>(`${this.ESTOQUE_SERVICE_URL}/${id}`, produto)
      .pipe(
        catchError((error) => {
          console.error('Erro ao atualizar produto', error);
          return throwError(error);
        })
      );
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.ESTOQUE_SERVICE_URL}/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produto', error);
        return throwError(error);
      })
    );
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ESTOQUE_SERVICE_URL}/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao deletar produto', error);
        return throwError(error);
      })
    );
  }
}
