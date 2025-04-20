package com.br.diegoformentin.gestaoatendimentoapp.dto.cliente;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ClienteAutocompleteDto {
    private UUID id;
    private String nome;
}
