import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtendimentoClienteResponseDto } from '../../model/atendimento-cliente-response-dto';
import { CommonModule } from '@angular/common';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { PanelModule as PanelModulePrimeNg } from 'primeng/panel';

@Component({
  selector: 'app-atendimentos-dia',
  imports: [CommonModule, ButtonModulePrimeng, PanelModulePrimeNg],
  templateUrl: './atendimentos-dia.component.html',
  styleUrl: './atendimentos-dia.component.scss',
})
export class AtendimentosDiaComponent implements OnInit {
  data: AtendimentoClienteResponseDto[] = [];

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly modalData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.data = this.modalData.data;
  }

  navegar(): void {
    this.dialogRef.close(true);
  }

  sair(): void {
    this.dialogRef.close(false);
  }
}
