export interface StateShape {
  id: string
  viewBox: string
  path: string
}

export const STATE_SHAPES: Record<string, StateShape> = {
  SP: {
    id: 'SP',
    viewBox: '0 0 120 120',
    path: 'M20 58 L38 36 L72 30 L98 46 L92 70 L70 88 L42 90 L24 76 Z'
  },
  RJ: {
    id: 'RJ',
    viewBox: '0 0 120 120',
    path: 'M18 72 L38 48 L62 42 L82 54 L94 74 L72 88 L48 92 L28 86 Z'
  },
  BA: {
    id: 'BA',
    viewBox: '0 0 120 120',
    path: 'M56 14 L84 30 L92 62 L74 94 L42 104 L24 74 L30 40 Z'
  },
  PE: {
    id: 'PE',
    viewBox: '0 0 120 120',
    path: 'M18 58 L42 42 L76 40 L100 52 L92 68 L66 78 L36 80 L20 70 Z'
  },
  MG: {
    id: 'MG',
    viewBox: '0 0 120 120',
    path: 'M18 54 L40 30 L82 34 L102 56 L88 86 L44 92 L22 74 Z'
  },
  PA: {
    id: 'PA',
    viewBox: '0 0 120 120',
    path: 'M14 48 L40 20 L88 22 L108 46 L92 76 L56 94 L24 82 Z'
  },
  RS: {
    id: 'RS',
    viewBox: '0 0 120 120',
    path: 'M42 16 L72 22 L92 46 L84 84 L56 104 L28 90 L24 56 Z'
  },
  AM: {
    id: 'AM',
    viewBox: '0 0 120 120',
    path: 'M12 54 L34 24 L84 20 L108 42 L100 74 L72 98 L28 92 Z'
  }
}

export const getStateShape = (stateCode: string) => STATE_SHAPES[stateCode]
