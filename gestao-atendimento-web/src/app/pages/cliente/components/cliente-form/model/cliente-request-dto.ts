export interface ClienteDto {
  id?: string;
  tipoUsuario: number;
  nome: string;
  cpf: string;
  whatsapp?: string;
  email: string;
  senha: string;
  enderecoComercial: EnderecoDto;
  observacao?: string;
}

interface EnderecoDto {
  rua: string;
  numero?: number;
  bairro?: string;
  cep?: string;
  cidade: string;
  estado: string;
}
