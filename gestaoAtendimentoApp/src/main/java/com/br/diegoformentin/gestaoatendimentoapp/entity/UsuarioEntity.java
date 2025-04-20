package com.br.diegoformentin.gestaoatendimentoapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario", discriminatorType = DiscriminatorType.INTEGER)
@Data
@SuperBuilder
@NoArgsConstructor
@Table(name = "usuario")
public abstract class UsuarioEntity {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(nullable = false, columnDefinition = "uuid")
    private UUID id;

    @Column(name = "tipo_usuario", insertable = false, updatable = false)
    private Integer tipoUsuario;

    @Column(nullable = false, length = 255)
    private String nome;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(length = 20)
    private String whatsapp;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @ManyToOne
    @JoinColumn(name = "endereco_comercial", nullable = false)
    private EnderecoEntity enderecoComercial;

    @Column(nullable = false)
    private LocalDate dataCadastro;

    @Column(nullable = false)
    private boolean senhaRedefinida;

//    @PrePersist
//    @PreUpdate
//    private void setTipoPessoaOnPersistAndUpdate() {
//        if (this instanceof PessoaFisica) {
//            this.tipoPessoa = TipoPessoa.FISICA.getValue();
//        } else if (this instanceof PessoaJuridica) {
//            this.tipoPessoa = TipoPessoa.JURIDICA.getValue();
//        }
//    }
}
