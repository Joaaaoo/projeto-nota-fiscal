import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotaFiscal } from '../models/nota-fiscal.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaturamentoService {
  private FATURAMENTO_SERVICE_URL = `${environment.FATURAMENTO_SERVICE_URL}/notasFiscais`;

  constructor(private http: HttpClient) {}

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.FATURAMENTO_SERVICE_URL).pipe(
      catchError((error) => {
        console.error('Erro ao buscar notas fiscais', error);
        return throwError(error);
      })
    );
  }

  getNotaFiscalById(id: number): Observable<NotaFiscal> {
    return this.http
      .get<NotaFiscal>(`${this.FATURAMENTO_SERVICE_URL}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar nota fiscal', error);
          return throwError(error);
        })
      );
  }

  criarNotaFiscal(notaFiscal: Partial<NotaFiscal>): Observable<NotaFiscal> {
    return this.http
      .post<NotaFiscal>(this.FATURAMENTO_SERVICE_URL, notaFiscal)
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar nota fiscal', error);
          return throwError(error);
        })
      );
  }
}
