import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtendimentoClienteResponseDto } from './model/atendimento-cliente-response-dto';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  public listAll(): Observable<AtendimentoClienteResponseDto[]> {
    return this.http
      .get<AtendimentoClienteResponseDto[]>(`${this.URL}/atendimento-cliente`)
      .pipe(take(1));
  }

  public listAllByData(
    data: string
  ): Observable<AtendimentoClienteResponseDto[]> {
    return this.http
      .get<AtendimentoClienteResponseDto[]>(
        `${this.URL}/atendimento-cliente/data/${data}`
      )
      .pipe(take(1));
  }

  public listUnico(id: string): Observable<AtendimentoClienteResponseDto> {
    return this.http
      .get<AtendimentoClienteResponseDto>(
        `${this.URL}/atendimento-cliente/${id}`
      )
      .pipe(take(1));
  }
}
