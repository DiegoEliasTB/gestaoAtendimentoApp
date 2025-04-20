export interface ClienteResponseDto {
  id?: string;
  tipoUsuario: number;
  nome: string;
  cpf: string;
  whatsapp?: string;
  email: string;
  observacao?: string;
  dataCadastro: Date;
}
