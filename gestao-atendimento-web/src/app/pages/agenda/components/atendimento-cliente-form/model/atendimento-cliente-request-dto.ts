export interface AtendimentoClienteRequestDto {
  id?: string;
  cliente: string;
  atendimento: string;
  data: string;
  hora: string;
  duracaoSessao: number;
  valor: number;
}
