package com.br.diegoformentin.gestaoatendimentoapp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class EnderecoCadastroDto {
    private UUID id;
    private String rua;
    private String numero;
    private String bairro;
    private String cep;
    private CidadeDto cidade;
    private EstadoDto estado;
}
