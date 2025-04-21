import { Component, OnInit } from '@angular/core';
import { AtendimentoClienteResponseDto } from '../../model/atendimento-cliente-response-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { ButtonModule as ButtonModulePrimeng } from 'primeng/button';
import { PanelModule as PanelModulePrimeNg } from 'primeng/panel';
import { DividerModule as DividerModulePrimeNg } from 'primeng/divider';

@Component({
  selector: 'app-atendimento-unico',
  imports: [
    CommonModule,
    ButtonModulePrimeng,
    PanelModulePrimeNg,
    DividerModulePrimeNg,
  ],
  templateUrl: './atendimento-unico.component.html',
  styleUrl: './atendimento-unico.component.scss',
})
export class AtendimentoUnicoComponent implements OnInit {
  data!: AtendimentoClienteResponseDto;

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
