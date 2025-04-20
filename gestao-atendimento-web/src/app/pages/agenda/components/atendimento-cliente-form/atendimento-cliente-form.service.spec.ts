import { TestBed } from '@angular/core/testing';

import { AtendimentoClienteFormService } from './atendimento-cliente-form.service';

describe('AtendimentoClienteFormService', () => {
  let service: AtendimentoClienteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentoClienteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
