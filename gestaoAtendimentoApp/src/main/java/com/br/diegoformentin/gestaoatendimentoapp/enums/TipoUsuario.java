package com.br.diegoformentin.gestaoatendimentoapp.enums;

public enum TipoUsuario {
    ADMINISTRADOR(0),
    FUNCIONARIO(1),
    PACIENTE(2);

    private final int codigo;

    TipoUsuario(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public static TipoUsuario valueOf(int codigo) {
        for (TipoUsuario tipoUsuario : TipoUsuario.values()) {
            if (tipoUsuario.codigo == codigo) {
                return tipoUsuario;
            }
        }

        return null;
    }
}
