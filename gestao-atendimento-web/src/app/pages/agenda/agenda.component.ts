import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { ToastModule as ToastModulePrimeNg } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AtendimentoClienteFormComponent } from './components/atendimento-cliente-form/atendimento-cliente-form.component';
import { AgendaService } from './agenda.service';
import { HttpClientModule } from '@angular/common/http';
import { AtendimentoClienteResponseDto } from './model/atendimento-cliente-response-dto';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AtendimentosDiaComponent } from './components/atendimentos-dia/atendimentos-dia.component';
import { AtendimentoUnicoComponent } from './components/atendimento-unico/atendimento-unico.component';

@Component({
  selector: 'app-agenda',
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModulePrimeng,
    ToastModulePrimeNg,
    FullCalendarModule,
  ],
  providers: [DialogService, MessageService, AgendaService],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Reunião', date: '2025-04-25' },
      { title: 'Aniversário', date: '2025-04-28', color: 'green' },
    ],

    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  dadosCalendario: any[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    this.inicializaCalendario();
  }

  cadastrarAtendimentoCliente(): void {
    this.dialogService
      .open(AtendimentoClienteFormComponent, {
        header: 'Cadastrar atendimento de cliente',
        resizable: true,
        closable: true,
        styleClass: 'w-md',
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
        this.inicializaCalendario();
      });
  }

  handleDateClick(arg: any) {
    this.agendaService.listAllByData(arg.dateStr).subscribe((res) => {
      this.dialogService
        .open(AtendimentosDiaComponent, {
          data: res,
          header: 'Eventos por data',
          resizable: true,
          closable: true,
          styleClass: 'w-xl',
          modal: true,
        })
        .onClose.subscribe((feedback: boolean) => {
          if (feedback) {
            this.cadastrarAtendimentoCliente();
          }
        });
    });
  }

  handleEventClick(arg: any) {
    this.agendaService
      .listUnico(arg.event.extendedProps.data)
      .subscribe((res) => {
        this.dialogService
          .open(AtendimentoUnicoComponent, {
            data: res,
            header: 'Dados completo do atendimento',
            resizable: true,
            closable: true,
            styleClass: 'w-xl',
            modal: true,
          })
          .onClose.subscribe((feedback: boolean) => {
            if (feedback) {
              this.cadastrarAtendimentoCliente();
            }
          });
      });
  }

  private inicializaCalendario(): void {
    this.agendaService.listAll().subscribe((res) => {
      const dadoCalendario = this.dtoToDadoTipoCalendario(res);

      this.dadosCalendario = dadoCalendario;

      this.calendarOptions.events = dadoCalendario;
    });
  }

  private dtoToDadoTipoCalendario(
    atendimentos: AtendimentoClienteResponseDto[]
  ): any[] {
    return atendimentos.map((it) => {
      return {
        title: `${it.atendimento.descricao} - ${it.cliente.nome}`,
        date: it.data,
        data: it.id,
      };
    });
  }
}
