package com.br.diegoformentin.gestaoatendimentoapp.repository;

import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AtendimentoClienteRepository extends JpaRepository<AtendimentoClienteEntity, UUID>  {
}
