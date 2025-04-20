import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AtendimentoDto } from './model/atendimento-dto';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  public listAll(): Observable<AtendimentoDto[]> {
    return this.http
      .get<AtendimentoDto[]>(`${this.URL}/atendimento`)
      .pipe(take(1));
  }

  public getAtendimentoById(id: string): Observable<AtendimentoDto> {
    return this.http
      .get<AtendimentoDto>(`${this.URL}/atendimento/${id}`)
      .pipe(take(1));
  }

  public deleteAtendimentoById(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.URL}/atendimento/${id}`)
      .pipe(take(1));
  }
}
