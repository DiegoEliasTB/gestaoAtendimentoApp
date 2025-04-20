package com.br.diegoformentin.gestaoatendimentoapp.dto.usuario;

import lombok.*;

@Builder
@Getter
@Setter
@Data
public class RetornoLogin {
    private String token;
    private String tipoUsuario;
}
