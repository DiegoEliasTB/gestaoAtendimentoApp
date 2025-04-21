package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.clienteatendimento.ClienteAtendimentoResponseDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.AtendimentoClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
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

    @GetMapping
    public List<ClienteAtendimentoResponseDto> listAll() {
        return atendimentoClienteService.listAll();
    }

    @GetMapping("data/{data}")
    public List<ClienteAtendimentoResponseDto> listAllByData(@PathVariable String data) {
        return atendimentoClienteService.listAllByData(data);
    }

    @GetMapping("{id}")
    public ClienteAtendimentoResponseDto getById(@PathVariable UUID id) {
        return atendimentoClienteService.getById(id);
    }
}
