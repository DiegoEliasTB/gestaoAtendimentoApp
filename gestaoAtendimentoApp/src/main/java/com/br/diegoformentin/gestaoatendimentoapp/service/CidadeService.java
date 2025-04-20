package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.CidadeDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.CidadeEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.CidadeRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EstadoRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CidadeService {
    private final CidadeRepository cidadeRepository;
    private final EstadoRepository estadoRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public CidadeEntity create(CidadeDto dto) {
        try {
            final var entity = dtoToEntity(dto);
            return cidadeRepository.save(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criar cidade", e);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public CidadeEntity update(CidadeDto dto) {
        try {
            final var entity = dtoToEntity(dto);
            return cidadeRepository.saveAndFlush(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao atualizar cidade", e);
        }
    }

    private CidadeEntity dtoToEntity(CidadeDto cidadeDto) {
        final var estadoEntity = estadoRepository.findById(cidadeDto.getEstado());

        if (estadoEntity.isEmpty()) {
            throw new IllegalStateException(String.format("Erro ao tentar buscar estado {}", cidadeDto.getEstado()));
        }

        return CidadeEntity.builder() //
                .id(cidadeDto.getId()) //
                .nome(cidadeDto.getNome()) //
                .estado(estadoEntity.get()) //
                .build();
    }
}
