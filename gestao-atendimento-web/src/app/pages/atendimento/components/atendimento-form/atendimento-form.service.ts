import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AtendimentoDto } from '../../model/atendimento-dto';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoFormService {
  private readonly URL = `http://localhost:8080/`;

  constructor(private http: HttpClient) {}

  public criarAtendimento(dto: AtendimentoDto): Observable<AtendimentoDto> {
    return this.http
      .post<AtendimentoDto>(`${this.URL}atendimento`, dto)
      .pipe(take(1));
  }

  public editarAtendimento(dto: AtendimentoDto): Observable<AtendimentoDto> {
    return this.http
      .put<AtendimentoDto>(`${this.URL}atendimento`, dto)
      .pipe(take(1));
  }
}
