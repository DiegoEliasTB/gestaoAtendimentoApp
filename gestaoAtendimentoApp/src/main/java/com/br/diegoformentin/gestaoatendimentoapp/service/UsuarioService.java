package com.br.diegoformentin.gestaoatendimentoapp.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.LoginDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.usuario.RetornoLogin;
import com.br.diegoformentin.gestaoatendimentoapp.entity.FuncionarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.entity.UsuarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.EnderecoRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.FuncionarioRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.UsuarioRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    @Value("${jwt.secret}")
    public String secret;

    @Value("${jwt.expiration}")
    public long expirationTime;

    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public RetornoLogin login(LoginDto dto) {
        var usuarioExistente = usuarioRepository.findByEmail(dto.getEmail());
        if (usuarioExistente.isEmpty()) {
            throw new IllegalStateException("E-mail ou senha incorretos");
        }

        if (usuarioExistente.get().getSenha().equals(dto.getSenha())) {
            return RetornoLogin.builder() //
                    .token(generateToken(usuarioExistente.get().getEmail())) //
                    .tipoUsuario(usuarioExistente.get().getTipoUsuario().toString()) //
                    .build();
        }

        throw new IllegalStateException("E-mail ou senha incorretos");
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
