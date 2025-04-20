package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.EnderecoCadastroDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.EnderecoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/endereco")
@AllArgsConstructor
public class EnderecoController {
    private final EnderecoService enderecoService;

    @PostMapping
    public UUID criarEndereco(@RequestBody EnderecoCadastroDto endereco) {
        return enderecoService.create(endereco).getId();
    }
}
