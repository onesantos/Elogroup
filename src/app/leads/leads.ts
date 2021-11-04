export class Leads {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  status: Status = Status.CLIENTE_EM_POTENCIAL;
  oportunidades: Oportunidade[] = [];
}

export class Oportunidade {
  id: number;
  value: string;
  isSelected: boolean;
}

export enum Status {
  CLIENTE_EM_POTENCIAL = 'Cliente em Potencial',
  DADOS_CONFIRMADOS = 'Dados Confirmados',
  REUNIAO = 'Reunião Agendada'
}
