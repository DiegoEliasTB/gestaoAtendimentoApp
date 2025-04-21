import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { SelectModule as SelectModulePrimeNg } from 'primeng/select';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { DatePickerModule as DatePickerModulePrimeNg } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AtendimentoClienteFormService } from './atendimento-cliente-form.service';
import { HttpClientModule } from '@angular/common/http';
import { ClienteAutocompleteDto } from './model/cliente-autocomplete-dto';
import { AtendimentoDto } from './model/atendimento-dto';
import { AtendimentoClienteRequestDto } from './model/atendimento-cliente-request-dto';

@Component({
  selector: 'app-atendimento-cliente-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModulePrimeng,
    InputTextModulePrimeng,
    FloatLabelPrimeng,
    SelectModulePrimeNg,
    ToastModulePrimeNg,
    DatePickerModulePrimeNg,
  ],
  providers: [AtendimentoClienteFormService, MessageService],
  templateUrl: './atendimento-cliente-form.component.html',
  styleUrl: './atendimento-cliente-form.component.scss',
})
export class AtendimentoClienteFormComponent implements OnInit, OnDestroy {
  atendimentoClienteForm!: FormGroup;
  inputSelectClienteData: ClienteAutocompleteDto[] = [];
  inputSelectTipoAtendimentoData: AtendimentoDto[] = [];

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly modalData: DynamicDialogConfig,
    private readonly atendimentoClienteService: AtendimentoClienteFormService
  ) {}

  ngOnInit(): void {
    this.inicializaCampos();
    this.inicializaform();
  }

  ngOnDestroy(): void {}

  submit(): void {
    if (!this.atendimentoClienteForm.valid) {
      this.messageService.add({
        severity: 'secondary',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos para o atendimento de cliente',
      });
      return;
    }

    const dto = this.getFormularioToDto();

    this.atendimentoClienteService.criarAtendimentoCliente(dto).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o atendimento do cliente',
        });
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  private inicializaCampos(): void {
    this.atendimentoClienteService
      .getClienteAutoComplete()
      .subscribe((res) => (this.inputSelectClienteData = res));

    this.atendimentoClienteService
      .getAtendimentoAutoComplete()
      .subscribe((res) => (this.inputSelectTipoAtendimentoData = res));
  }

  private inicializaform(): void {
    const edicaoCliente = this.modalData.data;
    if (edicaoCliente) {
      return;
    }

    this.atendimentoClienteForm = new FormGroup({
      id: new FormControl(null),
      cliente: new FormControl(null, Validators.required),
      atendimento: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      duracaoSessao: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
    });
  }

  private getFormularioToDto(): AtendimentoClienteRequestDto {
    const formuluario = this.atendimentoClienteForm.getRawValue();

    return {
      id: undefined,
      cliente: formuluario.cliente.id,
      atendimento: formuluario.atendimento.id,
      data: this.formataData(formuluario.data),
      hora: this.formataHora(formuluario.hora),
      duracaoSessao: formuluario.duracaoSessao,
      valor: formuluario.valor,
    };
  }

  private formataData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  private formataHora(data: Date): string {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
  }
}
