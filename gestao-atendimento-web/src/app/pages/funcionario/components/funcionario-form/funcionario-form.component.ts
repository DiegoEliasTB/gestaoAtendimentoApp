import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
//import { PanelModule as PanelModulePrimeng } from 'primeng/panel';
import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { PasswordModule as PasswordModulePrimeng } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DividerModule as DividerModulePrimeNg } from 'primeng/divider';
import { FuncionarioFormService } from './funcionario-form.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule as SelectModulePrimeNg } from 'primeng/select';
import { EstadoInputSelect } from './model/entado-input-select';
import { MessageService } from 'primeng/api';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { FuncionarioDto } from './model/funcionario-dto';

@Component({
  selector: 'app-funcionario-form',
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
  ],
  providers: [FuncionarioFormService, MessageService],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss',
})
export class FuncionarioFormComponent implements OnInit, OnDestroy {
  funcionarioEdit!: FuncionarioDto;
  funcionarioForm!: FormGroup;
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
    private readonly funcionarioFormService: FuncionarioFormService,
    private readonly messageService: MessageService,
    private modalData: DynamicDialogConfig
  ) {}

  ngOnDestroy(): void {
    this.dialogRef.destroy();
  }

  ngOnInit(): void {
    this.inicializaform();
  }

  submit(): void {
    if (!this.funcionarioForm.valid) {
      this.messageService.add({
        severity: 'secondary',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos para criar o usuário',
      });
      return;
    }

    const dto = this.getDtoByForm();

    this.funcionarioFormService.criarFuncionario(dto).subscribe({
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

  cancelar() {
    this.dialogRef.close(false);
  }

  buscarEnderecoPorCep() {
    const inputCep = this.funcionarioForm.controls['cep'].value as string;

    if (inputCep) {
      this.funcionarioFormService.getEndereco(inputCep).subscribe({
        next: (endereco) => {
          this.funcionarioForm.controls['rua'].setValue(endereco.logradouro);
          this.funcionarioForm.controls['bairro'].setValue(endereco.bairro);
          this.funcionarioForm.controls['cidade'].setValue(endereco.localidade);
          this.funcionarioForm.controls['estado'].setValue({
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
    const edicaoFuncionario = this.modalData.data;

    if (edicaoFuncionario) {
      this.funcionarioEdit = edicaoFuncionario as FuncionarioDto;

      this.funcionarioForm = new FormGroup({
        id: new FormControl(this.funcionarioEdit.id),
        nome: new FormControl({
          value: this.funcionarioEdit.nome,
          disabled: true,
        }),
        cpf: new FormControl({
          value: this.funcionarioEdit.cpf,
          disabled: true,
        }),
        email: new FormControl({
          value: this.funcionarioEdit.email,
          disabled: true,
        }),
        senha: new FormControl({
          value: this.funcionarioEdit.senha,
          disabled: true,
        }),

        whatsapp: new FormControl({
          value: this.funcionarioEdit.whatsapp,
          disabled: true,
        }),
        enderecoComercial: new FormControl(
          this.funcionarioEdit.enderecoComercial.id
        ),
        cep: new FormControl({
          value: this.funcionarioEdit.enderecoComercial.cep,
          disabled: true,
        }),
        rua: new FormControl({
          value: this.funcionarioEdit.enderecoComercial.rua,
          disabled: true,
        }),
        numero: new FormControl({
          value: this.funcionarioEdit.enderecoComercial.numero,
          disabled: true,
        }),
        bairro: new FormControl({
          value: this.funcionarioEdit.enderecoComercial.bairro,
          disabled: true,
        }),
        cidade: new FormControl({
          value: this.funcionarioEdit.enderecoComercial.cidade.nome,
          disabled: true,
        }),
        estado: new FormControl({
          value: this.getEstadoDataInput(
            this.funcionarioEdit.enderecoComercial.estado.sigla
          ),
          disabled: true,
        }),
      });

      return;
    }

    this.funcionarioForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, Validators.required),
      cpf: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
      whatsapp: new FormControl(null),
      cep: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null, Validators.min(0)),
      bairro: new FormControl(null, Validators.required),
      cidade: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
    });
  }

  private getDtoByForm(): FuncionarioDto {
    const formulario = this.funcionarioForm.getRawValue();
    return {
      id: formulario.id,
      tipoUsuario: 1,
      nome: formulario.nome,
      cpf: formulario.cpf,
      whatsapp: formulario.whatsapp,
      email: formulario.email,
      senha: formulario.senha,
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
