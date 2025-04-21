import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosDiaComponent } from './atendimentos-dia.component';

describe('AtendimentosDiaComponent', () => {
  let component: AtendimentosDiaComponent;
  let fixture: ComponentFixture<AtendimentosDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentosDiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtendimentosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
