import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { EnderecoCepDto } from './model/endereco-cep-dto';
import { FuncionarioDto } from './model/funcionario-dto';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioFormService {
  private readonly URL = `http://localhost:8080/`;
  private readonly URL_CEP = `https://viacep.com.br/ws/`;

  constructor(private http: HttpClient) {}

  public getEndereco(cep: string): Observable<EnderecoCepDto> {
    return this.http
      .get<EnderecoCepDto>(`${this.URL_CEP}${cep}/json`)
      .pipe(take(1));
  }

  public criarFuncionario(funcionerioDto: FuncionarioDto): Observable<string> {
    return this.http
      .post<string>(`${this.URL}funcionario/register`, funcionerioDto)
      .pipe(take(1));
  }

  public editaruncionario(funcionerioDto: FuncionarioDto): Observable<string> {
    return this.http
      .put<string>(`${this.URL}funcionario/update`, funcionerioDto)
      .pipe(take(1));
  }
}
