package com.br.diegoformentin.gestaoatendimentoapp.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "atendimento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
public class AtendimentoEntity {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "uuid")
    @EqualsAndHashCode.Include
    private UUID id;

    @Column(name = "descricao", nullable = false, length = 150)
    private String descricao;

    @Column(name = "valor_padrao", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorPadrao;

    @Column(name = "duracao_padrao", nullable = false)
    private Integer duracaoPadrao;
}
