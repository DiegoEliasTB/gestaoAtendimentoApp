package com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento;

import com.br.diegoformentin.gestaoatendimentoapp.dto.atendimento.AtendimentoDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteResponseListDto;
import com.br.diegoformentin.gestaoatendimentoapp.enums.StatusPagamentoEnum;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class ClienteAtendimentoResponseDto {
    private UUID id;
    private ClienteResponseListDto cliente;
    private AtendimentoDto atendimento;
    private LocalDate data;
    private LocalTime hora;
    private Integer duracaoSessao;
    private BigDecimal valor;
    private StatusPagamentoEnum statusPagamento;
}
