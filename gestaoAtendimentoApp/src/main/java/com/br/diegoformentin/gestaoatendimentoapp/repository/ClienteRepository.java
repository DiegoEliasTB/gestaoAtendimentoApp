package com.br.diegoformentin.gestaoatendimentoapp.repository;

import com.br.diegoformentin.gestaoatendimentoapp.entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, UUID> {
}
