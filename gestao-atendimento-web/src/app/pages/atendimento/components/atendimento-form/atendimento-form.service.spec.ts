import { TestBed } from '@angular/core/testing';

import { AtendimentoFormService } from './atendimento-form.service';

describe('AtendimentoFormService', () => {
  let service: AtendimentoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
