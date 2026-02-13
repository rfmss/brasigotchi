export const MAX_STAT = 100
export const MIN_STAT = 0
export const TICK_INTERVAL_MS = 5000

export const TICK_DECAY = {
  hunger: 4,
  energy: 3,
  hygiene: 2,
  mood: 2
}

export const ACTION_EFFECTS = {
  feed: { hunger: +22, energy: -2, hygiene: -3, mood: +1 },
  play: { hunger: -3, energy: -10, hygiene: -3, mood: +20 },
  sleep: { hunger: -3, energy: +24, hygiene: -2, mood: +2 },
  clean: { hunger: -1, energy: -1, hygiene: +25, mood: +1 }
}

export const EVOLUTION_TICKS = {
  child: 12,
  teen: 24,
  adult: 36
}
