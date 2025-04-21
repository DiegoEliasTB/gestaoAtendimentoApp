import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuModule as MenuModulePrimeNg } from 'primeng/menu';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MenuModulePrimeNg, ToastModulePrimeNg],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  estaNaPaginaDeLogin: boolean = true;
  items: MenuItem[] | undefined;
  perfil: number = 2;

  private routeSubscription: Subscription | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.inicializaUrlAtual();
    this.verificaUsuarioLogado();
  }

  private inicializaUrlAtual(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.estaNaPaginaDeLogin = event.url === '/login';
        this.verificaUsuarioLogado();
      }
    });
  }

  private verificaUsuarioLogado(): void {
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem('authToken');
      if (!user) {
        this.router.navigateByUrl('/login');
      } else {
        const perfil = localStorage.getItem('perfil');
        if (perfil !== null) {
          this.perfil = Number(perfil);
          this.inicializaMenu();
        }
      }
    }
  }

  private inicializaMenu(): void {
    switch (this.perfil) {
      case 0:
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.router.navigateByUrl('/'),
          },
          {
            label: 'Funcionários',
            icon: 'pi pi-user-plus',
            command: () => this.router.navigateByUrl('/funcionario'),
          },
          {
            separator: true,
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ];
        break;
      case 1:
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.router.navigateByUrl('/'),
          },
          {
            label: 'Agenda',
            icon: 'pi pi-calendar',
            command: () => this.router.navigateByUrl('/agenda'),
          },
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => this.router.navigateByUrl('/cliente'),
          },
          {
            label: 'Tipo atendimento',
            icon: 'pi pi-id-card',
            command: () => this.router.navigateByUrl('/atendimento'),
          },
          {
            label: 'Atendimentos',
            icon: 'pi pi-address-book',
            disabled: true,
            visible: false,
            //command: () => this.router.navigateByUrl('/funcionario'),
          },
          {
            label: 'Tipo despesa',
            icon: 'pi pi-shopping-bag',
            disabled: true,
            visible: false,
            //command: () => this.router.navigateByUrl('/funcionario'),
          },
          {
            label: 'Despesas',
            icon: 'pi pi-wallet',
            disabled: true,
            visible: false,
            //command: () => this.router.navigateByUrl('/funcionario'),
          },
          {
            label: 'Financeiro',
            icon: 'pi pi-chart-pie',
            disabled: true,
            //command: () => this.router.navigateByUrl('/funcionario'),
          },
          {
            separator: true,
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ];
        break;
      case 2:
        this.items = [
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ];
        break;

      default:
        this.items = [
          {
            label: 'Sairr',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ];
        break;
    }
  }

  private logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('perfil');
    this.router.navigateByUrl('/login');
  }
}
