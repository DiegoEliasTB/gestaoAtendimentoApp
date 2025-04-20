package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteAutocompleteDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteResponseListDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.ClienteEntity;
import com.br.diegoformentin.gestaoatendimentoapp.entity.FuncionarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.ClienteRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final EnderecoService enderecoService;
    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<ClienteResponseListDto> listAll() {
        final var clientes = clienteRepository.findAll();

        return clientes.stream().map(it -> ClienteResponseListDto.builder()
                        .id(it.getId())
                        .nome(it.getNome())
                        .cpf(it.getCpf())
                        .whatsapp(it.getWhatsapp())
                        .email(it.getEmail())
                        .tipoUsuario(it.getTipoUsuario())
                        .observacao(it.getObservacao())
                        .dataCadastro(it.getDataCadastro())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ClienteAutocompleteDto> listAllAutocomplete() {
        final var clientes = clienteRepository.findAll();
        return clientes.stream().map(it -> ClienteAutocompleteDto.builder()
                        .id(it.getId())
                        .nome(it.getNome())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UUID create(ClienteRequestDto clienteRequestDto) {
        if (usuarioRepository.existsByCpf(clienteRequestDto.getCpf())) {
            throw new IllegalStateException("Já existe um funcionário cadastrado com este CPF");
        }

        try {
            final var entity = dtoToEntity(clienteRequestDto);
            return clienteRepository.save(entity).getId();
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criar funcionário", e);
        }
    }

    private ClienteEntity dtoToEntity(ClienteRequestDto dto) {
        final var endereco = enderecoService.create(dto.getEnderecoComercial());

        return ClienteEntity.builder()
                .id(null)
                .tipoUsuario(2)
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .whatsapp(dto.getWhatsapp())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .enderecoComercial(endereco)
                .dataCadastro(LocalDate.now())
                .senhaRedefinida(false)
                .observacao(dto.getObservacao())
                .build();
    }
}
