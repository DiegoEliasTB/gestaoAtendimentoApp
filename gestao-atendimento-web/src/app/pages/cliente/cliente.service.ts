import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ClienteDto } from './components/cliente-form/model/cliente-dto';
import { ClienteResponseDto } from './components/cliente-form/model/cliente-response-dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  public listAll(): Observable<ClienteResponseDto[]> {
    return this.http
      .get<ClienteResponseDto[]>(`${this.URL}/cliente`)
      .pipe(take(1));
  }

  public getFuncionarioById(id: string): Observable<ClienteResponseDto> {
    return this.http
      .get<ClienteResponseDto>(`${this.URL}/funcionario/${id}`)
      .pipe(take(1));
  }
}
