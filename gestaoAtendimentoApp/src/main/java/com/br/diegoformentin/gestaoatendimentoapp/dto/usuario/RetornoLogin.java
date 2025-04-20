package com.br.diegoformentin.gestaoatendimentoapp.dto.usuario;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@Data
public class RetornoLogin {
    private UUID idUsuario;
    private String token;
    private String tipoUsuario;
    private boolean alteracaoSenhaPendente;
}
