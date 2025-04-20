import { Component, OnInit } from '@angular/core';
import { TableModule as TableModulePrimeNg } from 'primeng/table';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { ClienteDto } from './components/cliente-form/model/cliente-dto';
import { ClienteService } from './cliente.service';
import { ClienteResponseDto } from './components/cliente-form/model/cliente-response-dto';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente',
  imports: [
    CommonModule,
    HttpClientModule,
    TableModulePrimeNg,
    ButtonModulePrimeng,
    ToastModulePrimeNg,
  ],
  providers: [ClienteService, DialogService, MessageService],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent implements OnInit {
  clientes: ClienteResponseDto[] = [];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.inicializaTable();
  }

  cadastrarCliente() {
    this.dialogService
      .open(ClienteFormComponent, {
        header: 'Cadastrar cliente',
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
            detail: 'Cliente criado com sucesso',
          });
        }
        this.inicializaTable();
      });
  }

  private inicializaTable(): void {
    this.clienteService.listAll().subscribe((res) => {
      this.clientes = res;
    });
  }
}
