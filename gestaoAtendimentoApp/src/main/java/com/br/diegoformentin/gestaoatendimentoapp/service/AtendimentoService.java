package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.atendimento.AtendimentoDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.AtendimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AtendimentoService {
    private final AtendimentoRepository atendimentoRepository;

    @Transactional(readOnly = true)
    public List<AtendimentoDto> listAll() {
        return atendimentoRepository.findAll().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AtendimentoDto findById(UUID id) {
        var entity = atendimentoRepository.findById(id) //
                .orElseThrow(() -> new IllegalStateException("Atendimento não encontrado."));

        return entityToDto(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public AtendimentoDto create(AtendimentoDto dto) {
        try {
            final var entity = atendimentoRepository.save(AtendimentoEntity.builder()
                    .id(null)
                    .descricao(dto.getDescricao())
                    .valorPadrao(dto.getValorPadrao())
                    .duracaoPadrao(dto.getDuracaoPadrao())
                    .build());

            return entityToDto(entity);
        } catch (Exception e) {
          throw new IllegalStateException("Erro ao criar atendimento", e);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public AtendimentoDto update(AtendimentoDto dto) {
        try {
            final var entity = dtoToEntity(dto);
            final var updatedEntity = atendimentoRepository.saveAndFlush(entity);

            return entityToDto(updatedEntity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criar atendimento", e);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(UUID id) {
        try {
            var entity = atendimentoRepository.findById(id) //
                    .orElseThrow(() -> new IllegalStateException("Atendimento não encontrado."));
            atendimentoRepository.delete(entity);
        } catch (Exception e) {
          throw new IllegalStateException("Erro ao excluir atendimento", e);
        }
    }

    private AtendimentoDto entityToDto(AtendimentoEntity entity) {
        return AtendimentoDto.builder()
                .id(entity.getId())
                .descricao(entity.getDescricao())
                .valorPadrao(entity.getValorPadrao())
                .duracaoPadrao(entity.getDuracaoPadrao())
                .build();
    }

    private AtendimentoEntity dtoToEntity(AtendimentoDto dto) {
        return AtendimentoEntity.builder()
                .id(dto.getId())
                .descricao(dto.getDescricao())
                .valorPadrao(dto.getValorPadrao())
                .duracaoPadrao(dto.getDuracaoPadrao())
                .build();
    }
}
