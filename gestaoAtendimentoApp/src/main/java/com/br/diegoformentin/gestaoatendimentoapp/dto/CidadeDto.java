package com.br.diegoformentin.gestaoatendimentoapp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CidadeDto {
    private UUID id;
    private String nome;
    private UUID estado;
}
