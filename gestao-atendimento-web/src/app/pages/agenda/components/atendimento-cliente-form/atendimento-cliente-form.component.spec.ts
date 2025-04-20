import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoClienteFormComponent } from './atendimento-cliente-form.component';

describe('AtendimentoClienteFormComponent', () => {
  let component: AtendimentoClienteFormComponent;
  let fixture: ComponentFixture<AtendimentoClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoClienteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendimentoClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
