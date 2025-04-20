package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.br.diegoformentin.gestaoatendimentoapp.dto.EnderecoCadastroDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.CidadeEntity;
import com.br.diegoformentin.gestaoatendimentoapp.entity.EnderecoEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.CidadeRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EnderecoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EstadoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class EnderecoService {
    private final EnderecoRepository enderecoRepository;
    private final EstadoRepository estadoRepository;
    private final CidadeRepository cidadeRepository;
    private final CidadeService cidadeService;

    @Transactional(propagation = Propagation.REQUIRED)
    public EnderecoEntity create(EnderecoCadastroDto dto) {
        try {
            final var entity = dtoToEntity(dto);
            return enderecoRepository.save(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criar endereço", e);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public EnderecoEntity update(EnderecoCadastroDto dto) {
        try {
            final var entity = toUpdate(dto);
            return enderecoRepository.saveAndFlush(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao editar endereço", e);
        }
    }

    private EnderecoEntity toUpdate(EnderecoCadastroDto dto) {
        cidadeService.update(dto.getCidade());

        return EnderecoEntity.builder()
                .id(dto.getId())
                .cep(dto.getCep())
                .numero(dto.getNumero())
                .rua(dto.getRua())
                //.cidade()
                .build();
    }

    private EnderecoEntity dtoToEntity(EnderecoCadastroDto dto) {
        final var estado = estadoRepository.findBySigla(dto.getEstado().getSigla()) //
                .orElseThrow(() -> new IllegalStateException("Estado não encontrado"));

        final var cidade = estado.getCidades().stream()
                .filter(it -> it.getNome().equals(dto.getCidade().getNome()))
                .findFirst();

        if (cidade.isPresent()) {
            return EnderecoEntity.builder() //
                    .id(null) //
                    .rua(dto.getRua()) //
                    .numero(dto.getNumero()) //
                    .cidade(cidade.get()) //
                    .cep(dto.getCep()) //
                    .bairro(dto.getBairro()) //
                    .build();

        } else {
            var novaCidade = CidadeEntity.builder().id(null)
                    .nome(dto.getCidade().getNome())
                    .estado(estado)
                    .build();
            final var cidadeSaved = cidadeRepository.save(novaCidade);

            return EnderecoEntity.builder() //
                    .id(null) //
                    .cep(dto.getCep()) //
                    .rua(dto.getRua()) //
                    .numero(dto.getNumero()) //
                    .bairro(dto.getBairro()) //
                    .cidade(cidadeSaved) //
                    .build();
        }
    }
}
