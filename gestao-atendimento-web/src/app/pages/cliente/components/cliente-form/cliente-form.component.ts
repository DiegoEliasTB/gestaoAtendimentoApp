import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { PasswordModule as PasswordModulePrimeng } from 'primeng/password';
import { DividerModule as DividerModulePrimeNg } from 'primeng/divider';
import { SelectModule as SelectModulePrimeNg } from 'primeng/select';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { TextareaModule as TextareaModulePrimeNg } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FuncionarioFormService } from '../../../funcionario/components/funcionario-form/funcionario-form.service';
import { MessageService } from 'primeng/api';
import { ClienteDto } from './model/cliente-dto';
import { EstadoInputSelect } from './model/entado-input-select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteFormService } from './cliente-form.service';

@Component({
  selector: 'app-cliente-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModulePrimeng,
    InputTextModulePrimeng,
    FloatLabelPrimeng,
    PasswordModulePrimeng,
    DividerModulePrimeNg,
    HttpClientModule,
    SelectModulePrimeNg,
    ToastModulePrimeNg,
    TextareaModulePrimeNg,
  ],
  providers: [FuncionarioFormService, MessageService, ClienteFormService],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  clienteEdit!: ClienteDto;
  clienteForm!: FormGroup;
  inputEstadosData: EstadoInputSelect[] = [
    { estado: 'AC', label: 'Acre' },
    { estado: 'AL', label: 'Alagoas' },
    { estado: 'AP', label: 'Amapá' },
    { estado: 'AM', label: 'Amazonas' },
    { estado: 'BA', label: 'Bahia' },
    { estado: 'CE', label: 'Ceará' },
    { estado: 'DF', label: 'Distrito Federal' },
    { estado: 'ES', label: 'Espírito Santo' },
    { estado: 'GO', label: 'Goiás' },
    { estado: 'MA', label: 'Maranhão' },
    { estado: 'MT', label: 'Mato Grosso' },
    { estado: 'MS', label: 'Mato Grosso do Sul' },
    { estado: 'MG', label: 'Minas Gerais' },
    { estado: 'PA', label: 'Pará' },
    { estado: 'PB', label: 'Paraíba' },
    { estado: 'PR', label: 'Paraná' },
    { estado: 'PE', label: 'Pernambuco' },
    { estado: 'PI', label: 'Piauí' },
    { estado: 'RJ', label: 'Rio de Janeiro' },
    { estado: 'RN', label: 'Rio Grande do Norte' },
    { estado: 'RS', label: 'Rio Grande do Sul' },
    { estado: 'RO', label: 'Rondônia' },
    { estado: 'RR', label: 'Roraima' },
    { estado: 'SC', label: 'Santa Catarina' },
    { estado: 'SP', label: 'São Paulo' },
    { estado: 'SE', label: 'Sergipe' },
    { estado: 'TO', label: 'Tocantins' },
  ];

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private modalData: DynamicDialogConfig,
    private readonly clienteFormService: ClienteFormService
  ) {}

  ngOnInit(): void {
    this.inicializaform();
  }

  ngOnDestroy(): void {
    this.dialogRef.destroy();
  }

  submit(): void {
    if (!this.clienteForm.valid) {
      this.messageService.add({
        severity: 'secondary',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos para criar o usuário cliente',
      });
      return;
    }

    const dto = this.getDtoByForm();

    this.clienteFormService.criarCliente(dto).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o funcionário',
        });
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  buscarEnderecoPorCep() {
    const inputCep = this.clienteForm.controls['cep'].value as string;

    if (inputCep) {
      this.clienteFormService.getEndereco(inputCep).subscribe({
        next: (endereco) => {
          this.clienteForm.controls['rua'].setValue(endereco.logradouro);
          this.clienteForm.controls['bairro'].setValue(endereco.bairro);
          this.clienteForm.controls['cidade'].setValue(endereco.localidade);
          this.clienteForm.controls['estado'].setValue({
            estado: endereco.uf,
            label: endereco.estado,
          });
        },
        error: (e) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Cep não encontrado',
            detail:
              'Não foi possível localizar o endereço pelo CEP. Preecha os dados manualmente.',
          });
        },
      });
    }
  }

  private inicializaform(): void {
    const edicaoCliente = this.modalData.data;
    if (edicaoCliente) {
      return;
    }

    this.clienteForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, Validators.required),
      cpf: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
      whatsapp: new FormControl(null),
      observacao: new FormControl(null),
      cep: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null, Validators.min(0)),
      bairro: new FormControl(null, Validators.required),
      cidade: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
    });
  }

  private getDtoByForm(): ClienteDto {
    const formulario = this.clienteForm.getRawValue();
    return {
      id: formulario.id,
      tipoUsuario: 2,
      nome: formulario.nome,
      cpf: formulario.cpf,
      whatsapp: formulario.whatsapp,
      email: formulario.email,
      senha: formulario.senha,
      observacao: formulario.observacao,
      enderecoComercial: {
        id: formulario.id,
        cep: formulario.cep,
        rua: formulario.rua,
        numero: formulario.numero,
        bairro: formulario.bairro,
        cidade: {
          id: formulario.cidade.id,
          nome: formulario.cidade,
        },
        estado: {
          nome: formulario.estado.label,
          sigla: formulario.estado.estado,
        },
      },
    };
  }

  private getEstadoDataInput(uf: string): EstadoInputSelect {
    const estado = this.inputEstadosData.find((it) => it.estado === uf);

    if (estado) {
      return estado;
    }

    return this.inputEstadosData[0];
  }
}
