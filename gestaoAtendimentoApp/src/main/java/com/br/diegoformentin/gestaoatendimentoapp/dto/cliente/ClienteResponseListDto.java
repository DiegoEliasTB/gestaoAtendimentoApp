package com.br.diegoformentin.gestaoatendimentoapp.dto.cliente;

import com.br.diegoformentin.gestaoatendimentoapp.dto.EnderecoCadastroDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class ClienteResponseListDto {
    private UUID id;
    private Integer tipoUsuario;
    private String nome;
    private String cpf;
    private String whatsapp;
    private String email;
    private String observacao;
    private LocalDate dataCadastro;
}
