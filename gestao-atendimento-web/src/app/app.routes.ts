import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'atendimento', component: AtendimentoComponent },
];
