package com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class ClienteAtendimentoRequestDto {
    private UUID id;
    private UUID cliente;
    private UUID atendimento;
    private LocalDate data;
    private LocalTime hora;
    private Integer duracaoSessao;
    private BigDecimal valor;
}
