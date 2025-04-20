package com.br.diegoformentin.gestaoatendimentoapp.dto.atendimento;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class AtendimentoDto {
    private UUID id;
    private String descricao;
    private BigDecimal valorPadrao;
    private Integer duracaoPadrao;
}
