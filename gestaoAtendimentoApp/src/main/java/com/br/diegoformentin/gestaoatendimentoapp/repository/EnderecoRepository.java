package com.br.diegoformentin.gestaoatendimentoapp.repository;

import com.br.diegoformentin.gestaoatendimentoapp.entity.EnderecoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EnderecoRepository extends JpaRepository<EnderecoEntity, UUID> {
}
