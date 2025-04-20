import { Component, OnInit } from '@angular/core';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { PasswordModule as PasswordModulePrimeng } from 'primeng/password';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
import { Dialog, DialogModule as DialogModulePrimeNg } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RedefinirSenhaService } from './redefinir-senha.service';
import { FuncionarioRedefinirsenhaDto } from './model/funcionario-redefinirsenha-dto';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-redefinir-senha',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModulePrimeng,
    PasswordModulePrimeng,
    FloatLabelPrimeng,
    ButtonModulePrimeng,
    DialogModulePrimeNg,
    HttpClientModule,
  ],
  providers: [RedefinirSenhaService, DialogService],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.scss',
})
export class RedefinirSenhaComponent implements OnInit {
  formSenha!: FormGroup;

  constructor(
    private readonly redefinirSenhaService: RedefinirSenhaService,
    private readonly messageService: MessageService,
    private readonly dinamicModalRef: DynamicDialogRef,
    private readonly modalConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.inicializaForm();
  }

  submit(): void {
    if (this.formSenha.valid) {
      const senha = this.formSenha.controls['senha'].value;
      const confirmacaoSenha =
        this.formSenha.controls['confirmacaoSenha'].value;

      if (senha !== confirmacaoSenha) {
        this.formSenha.reset();

        return;
      }

      const modalData = this.modalConfig.data as { id: string };

      const input: FuncionarioRedefinirsenhaDto = {
        id: modalData.id,
        senha: senha,
      };
      this.redefinirSenhaService.alterarSenha(input).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Senha alterada com sucesso',
          });
          this.dinamicModalRef.close(true);
        },
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Não foi possível alterar a senha',
            detail: e.error.message,
          });
        },
      });
    }
  }

  private inicializaForm(): void {
    this.formSenha = new FormGroup({
      senha: new FormControl(null, Validators.required),
      confirmacaoSenha: new FormControl(null, Validators.required),
    });
  }
}
