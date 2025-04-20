package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.atendimento.AtendimentoDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.AtendimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/atendimento")
@RequiredArgsConstructor
public class AtendimentoController {
    private final AtendimentoService atendimentoService;

    @GetMapping
    public List<AtendimentoDto> listAll() {
        return atendimentoService.listAll();
    }

    @GetMapping("{id}")
    public AtendimentoDto findById(@PathVariable UUID id) {
        return atendimentoService.findById(id);
    }

    @PostMapping()
    public AtendimentoDto criarAtendimento(@RequestBody AtendimentoDto atendimentoDto) {
        return atendimentoService.create(atendimentoDto);
    }

    @PutMapping()
    public AtendimentoDto update(@RequestBody AtendimentoDto atendimentoDto) {
        return atendimentoService.create(atendimentoDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable UUID id) {
        atendimentoService.delete(id);
    }
}
