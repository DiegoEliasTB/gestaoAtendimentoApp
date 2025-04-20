package com.br.diegoformentin.gestaoatendimentoapp.config;

import com.br.diegoformentin.gestaoatendimentoapp.repository.FuncionarioRepository;
import com.br.diegoformentin.gestaoatendimentoapp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final FuncionarioRepository funcionarioRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .map(funcionario -> User.builder()
                        .username(funcionario.getEmail())
                        .password(funcionario.getSenha())
                        .roles(funcionario.getTipoUsuario().toString()) // Assumindo que TipoUsuario é um enum
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }
}
