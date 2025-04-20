package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoClienteEntity;
import com.br.diegoformentin.gestaoatendimentoapp.enums.StatusPagamentoEnum;
import com.br.diegoformentin.gestaoatendimentoapp.repository.AtendimentoClienteRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.AtendimentoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AtendimentoClienteService {

    private final ClienteRepository clienteRepository;
    private final AtendimentoRepository atendimentoRepository;
    private final AtendimentoClienteRepository atendimentoClienteRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public UUID criarAtendimentoCliente(ClienteAtendimentoRequestDto dto) {
        try {
            var entity = dtoToEntity(dto);
            return atendimentoClienteRepository.save(entity).getId();
        } catch (Exception e) {
          throw new IllegalStateException("Erro ao criar atendimento do cliente.", e);
        }
    }

    private AtendimentoClienteEntity dtoToEntity(ClienteAtendimentoRequestDto dto) {
        final var cliente = clienteRepository.findById(dto.getCliente())
                .orElseThrow(() -> new IllegalStateException("Cliente não encontrado."));
        final var atendimento = atendimentoRepository.findById(dto.getAtendimento())
                .orElseThrow(() -> new IllegalStateException("Atendimento não encontrado"));

        return AtendimentoClienteEntity.builder()
                .id(dto.getId())
                .cliente(cliente)
                .atendimento(atendimento)
                .data(dto.getData())
                .hora(dto.getHora())
                .duracaoSessao(dto.getDuracaoSessao())
                .valor(dto.getValor())
                .statusPagamento(StatusPagamentoEnum.ABERTO)
                .build();
    }
}
