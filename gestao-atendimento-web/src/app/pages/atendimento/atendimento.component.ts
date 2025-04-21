import { Component, OnInit } from '@angular/core';
import { AtendimentoDto } from './model/atendimento-dto';
import { TableModule as TableModulePrimeNg } from 'primeng/table';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { AtendimentoService } from './atendimento.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AtendimentoFormComponent } from './components/atendimento-form/atendimento-form.component';

@Component({
  selector: 'app-atendimento',
  imports: [
    CommonModule,
    HttpClientModule,
    TableModulePrimeNg,
    ButtonModulePrimeng,
    ToastModulePrimeNg,
  ],
  providers: [AtendimentoService, DialogService, MessageService],
  templateUrl: './atendimento.component.html',
  styleUrl: './atendimento.component.scss',
})
export class AtendimentoComponent implements OnInit {
  atendimentos: AtendimentoDto[] = [];

  constructor(
    private readonly atendimentoService: AtendimentoService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.inicializaTable();
  }

  cadastrarAtendimento(): void {
    this.dialogService
      .open(AtendimentoFormComponent, {
        header: 'Cadastrar tipo de atendimento',
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
            detail: 'Tipo de atendimento criado com sucesso',
          });
        }
        this.inicializaTable();
      });
  }

  editarAtendimento(id: string) {
    this.atendimentoService.getAtendimentoById(id).subscribe((res) => {
      this.dialogService
        .open(AtendimentoFormComponent, {
          data: res,
          header: 'Cadastrar tipo de atendimento',
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
              detail: 'Tipo de atendimento atualizado com sucesso',
            });
          }
          this.inicializaTable();
        });
    });
  }

  excluirAtendimento(id: string) {
    this.atendimentoService.deleteAtendimentoById(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipo de atendimento excluído com sucesso',
        });
        this.inicializaTable();
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Exclusão não permitida',
          detail: 'Não é permitido excluir esse tipo de atendimento',
        });
      },
    });
  }

  private inicializaTable(): void {
    this.atendimentoService.listAll().subscribe((res) => {
      this.atendimentos = res;
    });
  }
}
