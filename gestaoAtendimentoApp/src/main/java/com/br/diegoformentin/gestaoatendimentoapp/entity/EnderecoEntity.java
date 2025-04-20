package com.br.diegoformentin.gestaoatendimentoapp.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "endereco")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EnderecoEntity {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "uuid")
    @EqualsAndHashCode.Include
    private UUID id;

    @Column(nullable = false, length = 10)
    private String cep;

    @Column(nullable = false, length = 200)
    private String rua;

    @Column(length = 10)
    private String numero;

    @Column(nullable = false, length = 200)
    private String bairro;

    @ManyToOne
    @JoinColumn(name = "cidade", nullable = false)
    private CidadeEntity cidade;
}
