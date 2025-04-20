import { Component, OnInit } from '@angular/core';
import { TableModule as TableModulePrimeNg } from 'primeng/table';
import { ButtonModule as ButtonModulePrimeNg } from 'primeng/button';
import { Dialog, DialogModule as DialogModulePrimeNg } from 'primeng/dialog';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Funcionario } from './model/funcionario';
import { FuncionarioService } from './funcionario.service';
import { HttpClientModule } from '@angular/common/http';
import {
  DialogService,
  DynamicDialogModule as DynamicDialogModulePrimeNg,
} from 'primeng/dynamicdialog';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-funcionario',
  imports: [
    CommonModule,
    TableModulePrimeNg,
    ButtonModulePrimeNg,
    HttpClientModule,
    DialogModulePrimeNg,
    DynamicDialogModulePrimeNg,
    ToastModulePrimeNg,
  ],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss',
  providers: [FuncionarioService, DialogService, MessageService],
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.inicializaTable();
  }

  cadastrarFuncionario() {
    this.dialogService
      .open(FuncionarioFormComponent, {
        header: 'Cadastrar funcionário',
        resizable: true,
        closable: true,
        styleClass: 'w-xl',
        modal: true,
      })
      .onClose.subscribe((feedback: boolean) => {
        if (feedback) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Funcionário criado com sucesso',
          });
        }
        this.inicializaTable();
      });
  }

  editarFuncionario(id: string) {
    this.funcionarioService.getFuncionarioById(id).subscribe((funcionario) =>
      this.dialogService.open(FuncionarioFormComponent, {
        header: 'Editar funcionário',
        resizable: true,
        closable: true,
        styleClass: 'w-xl',
        modal: true,
        data: funcionario,
      })
    );
  }

  private inicializaTable(): void {
    this.funcionarioService.listAll().subscribe((res) => {
      this.funcionarios = res;
    });
  }
}
