import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoUnicoComponent } from './atendimento-unico.component';

describe('AtendimentoUnicoComponent', () => {
  let component: AtendimentoUnicoComponent;
  let fixture: ComponentFixture<AtendimentoUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoUnicoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendimentoUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
