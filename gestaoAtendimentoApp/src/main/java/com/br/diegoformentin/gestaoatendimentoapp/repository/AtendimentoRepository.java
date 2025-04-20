package com.br.diegoformentin.gestaoatendimentoapp.repository;

import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AtendimentoRepository extends JpaRepository<AtendimentoEntity, UUID> {
}
