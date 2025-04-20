package com.br.diegoformentin.gestaoatendimentoapp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class EstadoDto {
    private UUID id;
    private String nome;
    private String sigla;
}
