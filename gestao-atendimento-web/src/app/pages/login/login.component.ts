import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
import { PanelModule as PanelModulePrimeng } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { PasswordModule as PasswordModulePrimeng } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { LoginService } from './login.service';
import { LoginDto } from './model/LoginDto';
import { LoginRetornoErrorDto } from './model/LoginRetornoErrorDto';
import { Dialog, DialogModule as DialogModulePrimeNg } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModulePrimeng,
    InputTextModulePrimeng,
    PanelModulePrimeng,
    FloatLabelPrimeng,
    PasswordModulePrimeng,
    HttpClientModule,
    ToastModulePrimeNg,
    DialogModulePrimeNg,
  ],
  providers: [MessageService, LoginService, DialogService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  public tipoUsuario = 2;

  constructor(
    private readonly messageService: MessageService,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.startForm();
  }

  submit(): void {
    if (!this.formLogin.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obrigatórios',
        detail: 'Preencha os campos para acessar o sistema',
      });

      return;
    }

    const formData = this.formLogin.getRawValue() as LoginDto;
    this.loginService.login(formData).subscribe({
      next: (res) => {
        if (res && res.token) {
          if (!res.alteracaoSenhaPendente) {
            this.dialogService
              .open(RedefinirSenhaComponent, {
                data: { id: res.idUsuario },
                closeOnEscape: false,
                closable: false,
                modal: true,
              })
              .onClose.subscribe((it: boolean) => {
                if (it) {
                  localStorage.setItem('authToken', res.token);
                  localStorage.setItem('perfil', res.tipoUsuario);
                  this.tipoUsuario = Number(res.tipoUsuario);
                  this.router.navigate(['/']);
                }
              });
          } else {
            localStorage.setItem('authToken', res.token);
            localStorage.setItem('perfil', res.tipoUsuario);
            this.tipoUsuario = Number(res.tipoUsuario);
            this.router.navigate(['/']);
          }
        }
      },
      error: (e: LoginRetornoErrorDto) => {
        this.messageService.add({
          summary: 'Erro ao tentar logar',
          detail: e.error.message,
          severity: 'error',
        });
      },
    });
  }

  private startForm(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
    });
  }
}
