package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.LoginDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.usuario.RetornoLogin;
import com.br.diegoformentin.gestaoatendimentoapp.entity.FuncionarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.entity.UsuarioEntity;
import com.br.diegoformentin.gestaoatendimentoapp.repository.UsuarioRepository;
import com.br.diegoformentin.gestaoatendimentoapp.service.FuncionarioService;
import com.br.diegoformentin.gestaoatendimentoapp.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("login")
    public RetornoLogin login(@RequestBody LoginDto login) {
        return usuarioService.login(login);
    }

    @GetMapping
    public List<UsuarioEntity> listAll() {
        return usuarioRepository.findAll();
    }
}
