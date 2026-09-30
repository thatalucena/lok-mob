/* =========================================================================
   Lok Mob · Fonte única de conteúdo comercial
   Preços, condições, consultores e contatos. Tudo que aparece no comparador,
   na tabela de preços e na mensagem do WhatsApp sai daqui.
   ========================================================================= */

window.LM_DATA = {
  /* Frota de carros sem vaga no momento (100% em contrato ativo).
     Quando abrir vaga, trocar para true. */
  carAvailable: false,

  cities: {
    fortaleza: { label: 'Fortaleza', short: 'Fortaleza' },
    rmf: { label: 'Região Metropolitana de Fortaleza', short: 'RMF', priceFrom: 'fortaleza' },
    sobral: { label: 'Sobral', short: 'Sobral' }
  },

  vehicles: {
    start: { label: 'Start 160', model: 'Honda Start 160', tagline: 'Pra cidade', thumb: 'assets/img/thumb-start.jpg', type: 'moto' },
    bros: { label: 'Bros 160', model: 'Honda Bros 160', tagline: 'Pra estrada', thumb: 'assets/img/thumb-bros.jpg', type: 'moto' },
    carro: { label: 'Carro', model: 'Carro', tagline: 'Sem vaga agora', thumb: 'assets/img/thumb-carro.jpg', type: 'carro' }
  },

  /* price: { fortaleza, sobral } em reais inteiros.
     sobral: null = valor não informado (exibe "Sob consulta").
     unit/deposit valem para Fortaleza; cityRules.sobral sobrescreve a
     unidade de cobrança e a caução em Sobral quando forem diferentes.
     Valores de Sobral informados pelo cliente em 28/09/2026. */
  plans: {
    diaria: {
      name: 'Diária',
      fullName: 'Lok Mob Diária',
      summary: 'Pra quem precisa do veículo por poucos dias',
      description: 'Pra quem precisa resolver compromissos por poucos dias',
      unit: '/dia',
      banner: 'Contrato mínimo de 3 diárias.',
      vehicles: {
        bros: {
          price: { fortaleza: 80, sobral: 100 },
          contract: 'Mínimo de 3 diárias', deposit: 'R$ 800', mileage: '150 km por dia',
          overkm: 'R$ 0,25', credit: 'Análise rápida, sem consulta SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        },
        start: {
          price: { fortaleza: 60, sobral: 80 },
          contract: 'Mínimo de 3 diárias', deposit: 'R$ 800', mileage: '150 km por dia',
          overkm: 'R$ 0,25', credit: 'Análise rápida, sem consulta SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        },
        carro: {
          price: { fortaleza: 200, sobral: 200 },
          contract: 'Mínimo de 3 diárias', deposit: 'R$ 1500', mileage: '150 km por dia',
          overkm: 'R$ 0,75', credit: 'Análise rápida, sem consulta SPC e Serasa', reqs: 'Maior de 21 anos, CNH B'
        }
      }
    },

    app: {
      name: 'App',
      fullName: 'Lok Mob App',
      summary: 'Pra motorista de aplicativo e entregador',
      description: 'Pra motorista de aplicativo e entregador rodar no lucro',
      unit: '/semana',
      banner: 'Plano de Manutenção Garantido.',
      vehicles: {
        bros: {
          price: { fortaleza: 280, sobral: 300 },
          contract: '90 dias de fidelidade', deposit: 'R$ 500', mileage: '142km/dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'CNH com EAR e app ativo'
        },
        start: {
          price: { fortaleza: 250, sobral: 270 },
          contract: '90 dias de fidelidade', deposit: 'R$ 500', mileage: '142km/dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'CNH com EAR e app ativo'
        },
        carro: {
          price: { fortaleza: 600, sobral: 680 },
          contract: '90 dias de fidelidade', deposit: 'R$ 1000', mileage: '178 km por dia',
          overkm: 'R$ 0,75', credit: 'Sem consulta ao SPC e Serasa', reqs: 'CNH B com EAR'
        }
      }
    },

    flex: {
      name: 'Flex',
      fullName: 'Lok Mob Flex',
      summary: 'Pra quem precisa do veículo por mais tempo, com flexibilidade',
      description: 'Pra quem precisa do veículo por mais tempo, com flexibilidade',
      unit: '/mês',
      banner: 'Adesão mínima de 1 mês. Depois, o contrato renova mês a mês.',
      vehicles: {
        bros: {
          price: { fortaleza: 1400, sobral: 1500 },
          contract: 'Adesão mínima de 1 mês.', deposit: 'R$ 800', mileage: '150 km por dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        },
        start: {
          price: { fortaleza: 1300, sobral: 1400 },
          contract: 'Adesão mínima de 1 mês', deposit: 'R$ 800', mileage: '150 km por dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        },
        carro: {
          price: { fortaleza: 2650, sobral: 2650 },
          contract: 'Adesão mínima de 1 mês', deposit: 'R$ 1500', mileage: '150 km por dia',
          overkm: 'R$ 0,75', credit: 'Sem consulta ao SPC e Serasa', reqs: 'Maior de 21 anos, CNH B'
        }
      }
    },

    conquiste: {
      name: 'Conquiste',
      fullName: 'Lok Mob Conquiste',
      summary: 'Pra quem quer alugar pensando em ficar com a moto. Só moto.',
      description: 'Pra quem quer alugar pensando em ficar com a moto',
      unit: '/semana',
      banner: 'No último boleto, a moto é transferida para o seu nome se não houver débitos.',
      /* Conquiste é só moto: sem carro neste plano. */
      vehicles: {
        bros: {
          price: { fortaleza: 390, sobral: 390 },
          contract: '36 meses', deposit: 'R$ 800', mileage: '133 km por dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        },
        start: {
          price: { fortaleza: 340, sobral: 340 },
          contract: '36 meses', deposit: 'R$ 800', mileage: '133 km por dia',
          overkm: 'R$ 0,25', credit: 'Sem consulta ao SPC e Serasa', reqs: 'Maior de 18 anos, CNH válida'
        }
      }
    }
  },

  planOrder: ['diaria', 'app', 'flex', 'conquiste'],
  vehicleOrder: ['start', 'bros', 'carro'],

  /* WhatsApp de cada consultor: DDI + DDD + número, só dígitos (ex.: '5585912345678').
     Enquanto estiver vazio, a mensagem vai para o número central (fallbackWhatsapp). */
  consultants: [
    { id: 'lucas', name: 'Lucas', city: 'fortaleza', cityLabel: 'Fortaleza-CE', whatsapp: '' },
    { id: 'larissa', name: 'Larissa', city: 'sobral', cityLabel: 'Sobral-CE', whatsapp: '' }
  ],

  /* Número central provisório. Trocar pelo número oficial da Lok Mob. */
  fallbackWhatsapp: '5585999999999'
};
