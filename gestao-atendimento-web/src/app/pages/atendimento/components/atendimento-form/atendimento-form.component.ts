import { Component, OnDestroy, OnInit } from '@angular/core';
import { AtendimentoFormService } from './atendimento-form.service';
import { HttpClientModule } from '@angular/common/http';
import { AtendimentoDto } from '../../model/atendimento-dto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atendimento-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModulePrimeng,
    InputTextModulePrimeng,
    FloatLabelPrimeng,
    ToastModulePrimeNg,
  ],
  providers: [AtendimentoFormService, MessageService],
  templateUrl: './atendimento-form.component.html',
  styleUrl: './atendimento-form.component.scss',
})
export class AtendimentoFormComponent implements OnInit, OnDestroy {
  atendimentoEdit!: AtendimentoDto;
  atendimentoForm!: FormGroup;

  constructor(
    private readonly atendimentoFormService: AtendimentoFormService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private modalData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.inicializaform();
  }

  ngOnDestroy(): void {
    this.dialogRef.destroy();
  }

  submit() {
    if (!this.atendimentoForm.valid) {
      this.messageService.add({
        severity: 'secondary',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos para criar o atendimento',
      });
      return;
    }

    const dto = this.getDtoByForm();

    this.atendimentoFormService.criarAtendimento(dto).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o tipo de atendimento',
        });
      },
    });
  }

  edit() {
    if (!this.atendimentoForm.valid) {
      this.messageService.add({
        severity: 'secondary',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos para editar o tipo de atendimento',
      });
      return;
    }

    const dto = this.getDtoByForm();

    this.atendimentoFormService.editarAtendimento(dto).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível editar o tipo de atendimento',
        });
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  private inicializaform(): void {
    const edicaoCliente = this.modalData.data;
    if (edicaoCliente) {
      this.atendimentoForm = new FormGroup({
        id: new FormControl(edicaoCliente.id),
        descricao: new FormControl(
          edicaoCliente.descricao,
          Validators.required
        ),
        valorPadrao: new FormControl(
          edicaoCliente.valorPadrao,
          Validators.required
        ),
        duracaoPadrao: new FormControl(
          edicaoCliente.duracaoPadrao,
          Validators.required
        ),
      });

      return;
    }

    this.atendimentoForm = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, Validators.required),
      valorPadrao: new FormControl(null, Validators.required),
      duracaoPadrao: new FormControl(null, Validators.required),
    });
  }

  private getDtoByForm(): AtendimentoDto {
    const formulario = this.atendimentoForm.getRawValue();
    return {
      id: formulario.id,
      descricao: formulario.descricao,
      valorPadrao: formulario.valorPadrao,
      duracaoPadrao: formulario.duracaoPadrao,
    };
  }
}
