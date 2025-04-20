import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { FuncionarioDto } from '../../../funcionario/components/funcionario-form/model/funcionario-dto';
import { FuncionarioRedefinirsenhaDto } from './model/funcionario-redefinirsenha-dto';

@Injectable({
  providedIn: 'root',
})
export class RedefinirSenhaService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  alterarSenha(funcionario: FuncionarioRedefinirsenhaDto): Observable<string> {
    return this.http
      .put<string>(`${this.URL}/funcionario/redefirsenha`, funcionario)
      .pipe(take(1));
  }
}
