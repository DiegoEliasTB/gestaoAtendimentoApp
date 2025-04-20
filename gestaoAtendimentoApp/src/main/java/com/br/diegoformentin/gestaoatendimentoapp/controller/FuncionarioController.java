package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioRedefinirSenhaDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.LoginDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.FuncionarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/funcionario")
@AllArgsConstructor
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    @PostMapping("register")
    public UUID criarFuncionario(@RequestBody FuncionarioDto funcionario) {
        return funcionarioService.create(funcionario).getId();
    }

    @PutMapping("update")
    public UUID editarFuncionario(@RequestBody FuncionarioDto funcionario) {
        return funcionarioService.update(funcionario).getId();
    }

    @PostMapping("login")
    public String login(@RequestBody LoginDto login) {
        return funcionarioService.login(login);
    }

    @GetMapping
    public List<FuncionarioDto> listAll() {
        return funcionarioService.listAll();
    }

    @GetMapping("{id}")
    public FuncionarioDto findById(@PathVariable UUID id) {
        return funcionarioService.findById(id);
    }

    @PutMapping("redefirsenha")
    public UUID alterarSenha(@RequestBody FuncionarioRedefinirSenhaDto dto) {
        return funcionarioService.redefinirSenha(dto);
    }
}
