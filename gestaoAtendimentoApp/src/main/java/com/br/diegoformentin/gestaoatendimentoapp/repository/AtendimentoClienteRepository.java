package com.br.diegoformentin.gestaoatendimentoapp.repository;

import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AtendimentoClienteRepository extends JpaRepository<AtendimentoClienteEntity, UUID>  {
    List<AtendimentoClienteEntity> findAllByData(LocalDate data);
}
