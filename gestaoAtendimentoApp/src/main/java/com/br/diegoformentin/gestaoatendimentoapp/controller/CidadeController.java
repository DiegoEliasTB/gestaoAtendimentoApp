package com.br.diegoformentin.gestaoatendimentoapp.controller;

import com.br.diegoformentin.gestaoatendimentoapp.dto.CidadeDto;
import com.br.diegoformentin.gestaoatendimentoapp.service.CidadeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/cidade")
@AllArgsConstructor
public class CidadeController {
    private final CidadeService cidadeService;

    @PostMapping
    public UUID criarCidade(@RequestBody CidadeDto cidadeDto) {
        return cidadeService.create(cidadeDto).getId();
    }
}
