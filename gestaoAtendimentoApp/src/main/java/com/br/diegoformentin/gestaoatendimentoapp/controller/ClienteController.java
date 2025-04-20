package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteAutocompleteDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteRequestDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.cliente.ClienteResponseListDto;
import com.br.diegoformentin.gestaoatendimentoapp.dto.funcionario.FuncionarioDto;
import com.br.diegoformentin.gestaoatendimentoapp.repository.ClienteRepository;
import com.br.diegoformentin.gestaoatendimentoapp.service.ClienteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/cliente")
@AllArgsConstructor
public class ClienteController {
    private final ClienteService clienteService;

    @GetMapping
    public List<ClienteResponseListDto> listAll() {
        return clienteService.listAll();
    }

    @GetMapping("autocomplete")
    public List<ClienteAutocompleteDto> listAllAutoComplete() {
        return clienteService.listAllAutocomplete();
    }

    @PostMapping("register")
    public UUID criarCliente(@RequestBody ClienteRequestDto clienteRequestDto) {
        return clienteService.create(clienteRequestDto);
    }
}
