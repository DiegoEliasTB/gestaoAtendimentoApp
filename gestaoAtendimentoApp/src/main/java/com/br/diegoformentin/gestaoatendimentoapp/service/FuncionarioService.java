package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.br.diegoformentin.gestaoatendimentoapp.dto.CidadeDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.EnderecoCadastroDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.EstadoDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioRedefinirSenhaDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.LoginDto;
import com.br.diegoformentin.gestaoatendimentoapp.entity.FuncionarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EnderecoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EstadoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.FuncionarioRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FuncionarioService {
    private final UsuarioRepository usuarioRepository;
    private final EstadoRepository estadoRepository;
    private final EnderecoService enderecoService;
    @Value("${jwt.secret}")
    public String secret;

    @Value("${jwt.expiration}")
    public long expirationTime;

    private final FuncionarioRepository funcionarioRepository;
    private final EnderecoRepository enderecoRepository;

    @Transactional(readOnly = true)
    public List<FuncionarioDto> listAll() {

        var funcionarios = funcionarioRepository.findAll();
        return funcionarios.stream().map(it -> FuncionarioDto.builder()
                        .id(it.getId())
                        .tipoUsuario(it.getTipoUsuario())
                        .nome(it.getNome())
                        .cpf(it.getCpf())
                        .whatsapp(it.getWhatsapp())
                        .email(it.getEmail())
                        //.enderecoComercial(it.getEnderecoComercial().getId())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FuncionarioEntity create(FuncionarioDto dto) {
        if (funcionarioRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalStateException("Já existe um funcionário cadastrado com este CPF");
        }

        try {
            final var entity = dtoToEntity(dto);
            return funcionarioRepository.save(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criar funcionário", e);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public FuncionarioEntity update(FuncionarioDto dto) {
        try {
            final var entity = dtoToEntity(dto);
            return funcionarioRepository.saveAndFlush(entity);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao editar funcionário", e);
        }
    }

    @Transactional(readOnly = true)
    public String login(LoginDto dto) {
        var funcionarioExistente = funcionarioRepository.findByEmail(dto.getEmail());
        if (funcionarioExistente.isEmpty()) {
            throw new IllegalStateException("E-mail ou senha incorretos");
        }

        if (funcionarioExistente.get().getSenha().equals(dto.getSenha())) {
            return generateToken(funcionarioExistente.get().getEmail());
        }

        throw new IllegalStateException("E-mail ou senha incorretos");
    }

    @Transactional(readOnly = true)
    public FuncionarioDto findById(UUID id) {
        var funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Funcionário não encontrado"));

        return FuncionarioDto.builder()
                .id(funcionario.getId())
                .tipoUsuario(funcionario.getTipoUsuario())
                .nome(funcionario.getNome())
                .cpf(funcionario.getCpf())
                .whatsapp(funcionario.getWhatsapp())
                .email(funcionario.getEmail())
                .senha(funcionario.getSenha())
                .enderecoComercial(EnderecoCadastroDto.builder()
                        .id(funcionario.getEnderecoComercial().getId())
                        .cep(funcionario.getEnderecoComercial().getCep())
                        .rua(funcionario.getEnderecoComercial().getRua())
                        .numero(funcionario.getEnderecoComercial().getNumero())
                        .bairro(funcionario.getEnderecoComercial().getBairro())
                        .cidade(CidadeDto.builder()
                                .id(funcionario.getEnderecoComercial().getCidade().getId())
                                .nome(funcionario.getEnderecoComercial().getCidade().getNome())
                                .build())
                        .estado(EstadoDto.builder()
                                .id(funcionario.getEnderecoComercial().getCidade().getEstado().getId())
                                .nome(funcionario.getEnderecoComercial().getCidade().getEstado().getNome())
                                .sigla(funcionario.getEnderecoComercial().getCidade().getEstado().getSigla())
                                .build())
                        .build())
                .build();
    }

    public UUID redefinirSenha(FuncionarioRedefinirSenhaDto dto) {
        final var usuario = usuarioRepository.findById(dto.getId()) //
                .orElseThrow(() -> new IllegalStateException("Usuário não encontrado."));

        if (dto.getSenha().equals(usuario.getSenha())) {
            throw new IllegalStateException("A nova senha não pode ser igual a senha atual.");
        }
        
        usuario.setSenha(dto.getSenha());
        usuario.setSenhaRedefinida(true);

        return usuarioRepository.save(usuario).getId();
    }

    private FuncionarioEntity dtoToEntity(FuncionarioDto dto) {
        if (Objects.nonNull(dto.getId())) {
            final var endereco = enderecoService.update(dto.getEnderecoComercial());

            return FuncionarioEntity.builder()
                    .id(dto.getId()) //
                    .tipoUsuario(dto.getTipoUsuario()) //
                    .nome(dto.getNome()) //
                    .cpf(dto.getCpf()) //
                    .whatsapp(dto.getWhatsapp()) //
                    .email(dto.getEmail()) //
                    .senha(dto.getSenha()) //
                    .enderecoComercial(endereco) //
                    .dataCadastro(LocalDate.now()) //
                    //.senhaRedefinida(dto.se) //
                    .build();
        }

        final var endereco = enderecoService.create(dto.getEnderecoComercial());

        return FuncionarioEntity.builder() //
                .id(null) //
                .tipoUsuario(dto.getTipoUsuario()) //
                .nome(dto.getNome()) //
                .cpf(dto.getCpf()) //
                .whatsapp(dto.getWhatsapp()) //
                .email(dto.getEmail()) //
                .senha(dto.getSenha()) //
                .enderecoComercial(endereco) //
                .dataCadastro(LocalDate.now()) //
                .senhaRedefinida(false) //
                .build();
    }

    private String generateToken(String subject) {

        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(subject)
                .withIssuedAt(new Date())
                .withExpiresAt(Instant.now().plusMillis(expirationTime))
                .sign(algorithm);
    }
}
