package com.br.diegoformentin.gestaoatendimentoapp.enums;

import jakarta.persistence.AttributeConverter;

import javax.print.attribute.Attribute;

public class TipoUsuarioEnumConverter implements AttributeConverter<TipoUsuario, Integer> {

    @Override
    public Integer convertToDatabaseColumn(TipoUsuario tipoUsuario) {
        return tipoUsuario.getCodigo();
    }

    @Override
    public TipoUsuario convertToEntityAttribute(Integer codigo) {
        return TipoUsuario.valueOf(codigo);
    }
}
