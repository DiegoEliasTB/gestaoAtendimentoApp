package com.br.diegoformentin.gestaoatendimentoapp.dto.cliente;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
public class EnderecoClienteRequestDto {
    @NonNull
    private String rua;

    private Long numero;

    private String bairro;

    @NonNull
    private String cidade;

    @NonNull
    private String estado;
}
