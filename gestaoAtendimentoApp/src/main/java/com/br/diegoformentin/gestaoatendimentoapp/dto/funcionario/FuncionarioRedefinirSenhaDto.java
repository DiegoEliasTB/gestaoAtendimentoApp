package com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FuncionarioRedefinirSenhaDto {
    private UUID id;
    private String senha;
}
