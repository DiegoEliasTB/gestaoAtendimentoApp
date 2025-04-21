import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AtendimentoClienteFormComponent } from './pages/agenda/components/atendimento-cliente-form/atendimento-cliente-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'atendimento', component: AtendimentoComponent },
  { path: 'agenda', component: AgendaComponent },
];
