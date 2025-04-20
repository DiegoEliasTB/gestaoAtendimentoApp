package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.AtendimentoClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/atendimento-cliente")
@RequiredArgsConstructor
public class AtendimentoClienteController {
    private final AtendimentoClienteService atendimentoClienteService;

    @PostMapping
    public UUID criarAtendimentoCliente(@RequestBody ClienteAtendimentoRequestDto dto) {
        return atendimentoClienteService.criarAtendimentoCliente(dto);
    }
}
