package com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario;

import com.br.diegoformentin.gestaoatendimentoapp.dto.EnderecoCadastroDto;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FuncionarioDto {
    private UUID id;
    private Integer tipoUsuario;
    private String nome;
    private String cpf;
    private String whatsapp;
    private String email;
    private String senha;
    private EnderecoCadastroDto enderecoComercial;
}
