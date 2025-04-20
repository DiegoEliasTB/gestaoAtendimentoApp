import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnderecoCepDto } from './model/endereco-cep-dto';
import { Observable, take } from 'rxjs';
import { ClienteDto } from './model/cliente-dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteFormService {
  private readonly URL = `http://localhost:8080/`;
  private readonly URL_CEP = `https://viacep.com.br/ws/`;

  constructor(private http: HttpClient) {}

  public getEndereco(cep: string): Observable<EnderecoCepDto> {
    return this.http
      .get<EnderecoCepDto>(`${this.URL_CEP}${cep}/json`)
      .pipe(take(1));
  }

  public criarCliente(funcionerioDto: ClienteDto): Observable<string> {
    return this.http
      .post<string>(`${this.URL}cliente/register`, funcionerioDto)
      .pipe(take(1));
  }

  public editarCliente(funcionerioDto: ClienteDto): Observable<string> {
    return this.http
      .put<string>(`${this.URL}cliente/update`, funcionerioDto)
      .pipe(take(1));
  }
}
