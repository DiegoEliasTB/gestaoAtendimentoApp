import { Component } from '@angular/core';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
// import { InputTextModule as InputTextModulePrimeng } from 'primeng/inputtext';
// import { FloatLabel as FloatLabelPrimeng } from 'primeng/floatlabel';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AtendimentoClienteFormComponent } from './components/atendimento-cliente-form/atendimento-cliente-form.component';

@Component({
  selector: 'app-agenda',
  imports: [CommonModule, ButtonModulePrimeng, ToastModulePrimeNg],
  providers: [DialogService, MessageService],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent {
  constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  cadastrarAtendimentoCliente(): void {
    this.dialogService
      .open(AtendimentoClienteFormComponent, {
        header: 'Cadastrar atendimento de cliente',
        resizable: true,
        closable: true,
        styleClass: 'w-md',
        //height: '100%',
        modal: true,
      })
      .onClose.subscribe((feedback: boolean) => {
        if (feedback) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Atendimento do cliente criado com sucesso',
          });
        }
        this.inicializaTable();
      });
  }

  private inicializaTable(): void {}
}
