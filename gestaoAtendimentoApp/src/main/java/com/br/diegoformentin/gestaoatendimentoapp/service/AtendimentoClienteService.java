package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.atendimento.AtendimentoDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteResponseListDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoResponseDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.AtendimentoClienteEntity;
import com.br.diegoformentin.gestaoatendimentoapp.enums.StatusPagamentoEnum;
import com.br.diegoformentin.gestaoatendimentoapp.repository.AtendimentoClienteRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.AtendimentoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public List<ClienteAtendimentoResponseDto> listAll() {
        final var atendimentos = atendimentoClienteRepository.findAll();
        return atendimentos.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ClienteAtendimentoResponseDto> listAllByData(String data) {
        final var atendimentos = atendimentoClienteRepository.findAllByData(LocalDate.parse(data));

        return atendimentos.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ClienteAtendimentoResponseDto getById(UUID id) {
        final var atendimento = atendimentoClienteRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Atendimento não encontrado."));
        return entityToDto(atendimento);
    }

    private ClienteAtendimentoResponseDto entityToDto(AtendimentoClienteEntity it) {
        return ClienteAtendimentoResponseDto.builder()
                .id(it.getId())
                .cliente(ClienteResponseListDto.builder()
                        .id(it.getCliente().getId())
                        .nome(it.getCliente().getNome())
                        .cpf(it.getCliente().getCpf())
                        .whatsapp(it.getCliente().getWhatsapp())
                        .email(it.getCliente().getEmail())
                        .tipoUsuario(it.getCliente().getTipoUsuario())
                        .observacao(it.getCliente().getObservacao())
                        .dataCadastro(it.getCliente().getDataCadastro())
                        .build())
                .atendimento(AtendimentoDto.builder()
                        .id(it.getAtendimento().getId())
                        .descricao(it.getAtendimento().getDescricao())
                        .valorPadrao(it.getAtendimento().getValorPadrao())
                        .duracaoPadrao(it.getAtendimento().getDuracaoPadrao())
                        .build())
                .data(it.getData())
                .hora(it.getHora())
                .duracaoSessao(it.getDuracaoSessao())
                .valor(it.getValor())
                .statusPagamento(it.getStatusPagamento())
                .build();
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
