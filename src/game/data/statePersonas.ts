export interface StatePersona {
  id: string
  stateName: string
  mascotName: string
  slangGreeting: string
  vibe: string
  favoriteFoods: string[]
}

export const STATE_PERSONAS: StatePersona[] = [
  {
    id: 'SP',
    stateName: 'São Paulo',
    mascotName: 'Paulistogotchi',
    slangGreeting: 'E aí, meu! Bora comer um pão na chapa?',
    vibe: 'Acelerado, curioso e cheio de energia de metrópole.',
    favoriteFoods: ['pão na chapa', 'virado à paulista', 'pastel de feira']
  },
  {
    id: 'RJ',
    stateName: 'Rio de Janeiro',
    mascotName: 'Cariogotchi',
    slangGreeting: 'Coé, parceiro! Tá maneiro hoje, hein?',
    vibe: 'Descontraído, carismático e praiano.',
    favoriteFoods: ['biscoito globo', 'feijoada', 'filé à oswaldo aranha']
  },
  {
    id: 'BA',
    stateName: 'Bahia',
    mascotName: 'Baianogotchi',
    slangGreeting: 'Oxente, meu rei! Hoje tá massa demais!',
    vibe: 'Alegre, musical e cheio de axé.',
    favoriteFoods: ['acarajé', 'moqueca baiana', 'vatapá']
  },
  {
    id: 'PE',
    stateName: 'Pernambuco',
    mascotName: 'Pernambugotchi',
    slangGreeting: 'Visse? Bora brincar no ritmo do frevo!',
    vibe: 'Criativo, divertido e dançante.',
    favoriteFoods: ['bolo de rolo', 'tapioca', 'cartola']
  },
  {
    id: 'MG',
    stateName: 'Minas Gerais',
    mascotName: 'Mineirogotchi',
    slangGreeting: 'Uai, sô! Trem bão demais da conta.',
    vibe: 'Aconchegante, observador e amigo.',
    favoriteFoods: ['pão de queijo', 'feijão tropeiro', 'doce de leite']
  },
  {
    id: 'PA',
    stateName: 'Pará',
    mascotName: 'Paragotchi',
    slangGreeting: 'Égua! Hoje tá porreta pra se aventurar!',
    vibe: 'Aventureiro, amazônico e bem-humorado.',
    favoriteFoods: ['tacacá', 'pato no tucupi', 'açaí paraense']
  },
  {
    id: 'RS',
    stateName: 'Rio Grande do Sul',
    mascotName: 'Gaúchogotchi',
    slangGreeting: 'Bah, tchê! Partiu um rango caprichado.',
    vibe: 'Leal, valente e parceiro de chimarrão.',
    favoriteFoods: ['churrasco gaúcho', 'arroz de carreteiro', 'cuca']
  },
  {
    id: 'AM',
    stateName: 'Amazonas',
    mascotName: 'Amazogotchi',
    slangGreeting: 'Eita, mana! Hoje a floresta tá animada.',
    vibe: 'Curioso, natureza lover e brincalhão.',
    favoriteFoods: ['tambaqui assado', 'x-caboquinho', 'tacacá amazônico']
  }
]

export const getRandomPersona = () => {
  const index = Math.floor(Math.random() * STATE_PERSONAS.length)
  return STATE_PERSONAS[index]
}
