package com.br.diegoformentin.gestaoatendimentoapp.entity;

import com.br.diegoformentin.gestaoatendimentoapp.enums.StatusPagamentoEnum;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "atendimento_cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
public class AtendimentoClienteEntity {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "uuid")
    @EqualsAndHashCode.Include
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "cliente", nullable = false, referencedColumnName = "id")
    private ClienteEntity cliente;

    @ManyToOne
    @JoinColumn(name = "atendimento", nullable = false, referencedColumnName = "id")
    private AtendimentoEntity atendimento;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Column(name = "duracao_sessao", nullable = false)
    private Integer duracaoSessao;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "status_pagamento", nullable = false, length = 6)
    @Enumerated(EnumType.STRING)
    private StatusPagamentoEnum statusPagamento;
}
