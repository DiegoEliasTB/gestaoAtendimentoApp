import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ClienteAutocompleteDto } from './model/cliente-autocomplete-dto';
import { AtendimentoDto } from './model/atendimento-dto';
import { AtendimentoClienteRequestDto } from './model/atendimento-cliente-request-dto';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoClienteFormService {
  private readonly URL = `http://localhost:8080/`;

  constructor(private http: HttpClient) {}

  public getClienteAutoComplete(): Observable<ClienteAutocompleteDto[]> {
    return this.http
      .get<ClienteAutocompleteDto[]>(`${this.URL}cliente/autocomplete`)
      .pipe(take(1));
  }

  public getAtendimentoAutoComplete(): Observable<AtendimentoDto[]> {
    return this.http
      .get<AtendimentoDto[]>(`${this.URL}atendimento`)
      .pipe(take(1));
  }

  public criarAtendimentoCliente(
    dto: AtendimentoClienteRequestDto
  ): Observable<string> {
    return this.http
      .post<string>(`${this.URL}atendimento-cliente`, dto)
      .pipe(take(1));
  }
}
