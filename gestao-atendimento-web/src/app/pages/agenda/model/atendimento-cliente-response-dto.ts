export interface AtendimentoClienteResponseDto {
  id?: string;
  cliente: Cliente;
  atendimento: atendimento;
  data: string;
  hora: string;
  duracaoSessao: number;
  valor: number;
  statusPagamento: string;
}

interface Cliente {
  id?: string;
  tipoUsuario: number;
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  observacao: string;
  dataCadastro: string;
}

interface atendimento {
  id?: string;
  descricao: string;
  valorPadrao: number;
  duracaoPadrao: number;
}
