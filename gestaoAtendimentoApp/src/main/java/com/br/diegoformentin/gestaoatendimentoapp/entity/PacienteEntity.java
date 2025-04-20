package com.br.diegoformentin.gestaoatendimentoapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@DiscriminatorValue("2")
@Data
@EqualsAndHashCode(callSuper = true)
public class PacienteEntity extends UsuarioEntity {

    @Column(length = 255)
    private String observacao;
}
