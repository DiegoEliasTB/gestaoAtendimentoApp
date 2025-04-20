export interface FuncionarioDto {
  id?: string;
  tipoUsuario: number;
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  senha: string;
  enderecoComercial: EnderecoDto;
}

interface EnderecoDto {
  id?: string;
  rua: string;
  numero: number;
  bairro: string;
  cep: string;
  cidade: CidadeDto;
  estado: EstadoDto;
}

interface CidadeDto {
  id?: string;
  nome: string;
  estado?: string;
}

interface EstadoDto {
  id?: string;
  nome: string;
  sigla: string;
}
