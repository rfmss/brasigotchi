import { ACTION_EFFECTS, EVOLUTION_TICKS, MAX_STAT, MIN_STAT, TICK_DECAY } from './constants'
import type { PetAction, PetState } from '../types/pet'

const clamp = (value: number) => Math.max(MIN_STAT, Math.min(MAX_STAT, value))

const computeLifeStage = (ageTicks: number): PetState['lifeStage'] => {
  if (ageTicks >= EVOLUTION_TICKS.adult) return 'adult'
  if (ageTicks >= EVOLUTION_TICKS.teen) return 'teen'
  if (ageTicks >= EVOLUTION_TICKS.child) return 'child'
  return 'baby'
}

const evaluateAlive = (pet: PetState) => {
  const criticalCount = [pet.hunger, pet.energy, pet.hygiene, pet.mood].filter((v) => v <= 0).length
  return criticalCount < 2
}

export const applyTick = (pet: PetState): PetState => {
  const next: PetState = {
    ...pet,
    hunger: clamp(pet.hunger - TICK_DECAY.hunger),
    energy: clamp(pet.energy - TICK_DECAY.energy),
    hygiene: clamp(pet.hygiene - TICK_DECAY.hygiene),
    mood: clamp(pet.mood - TICK_DECAY.mood),
    ageTicks: pet.ageTicks + 1,
    lastUpdatedAt: Date.now()
  }

  next.lifeStage = computeLifeStage(next.ageTicks)
  next.alive = evaluateAlive(next)
  return next
}

export const applyAction = (pet: PetState, action: PetAction): PetState => {
  if (!pet.alive) return pet

  const effect = ACTION_EFFECTS[action]
  const next: PetState = {
    ...pet,
    hunger: clamp(pet.hunger + effect.hunger),
    energy: clamp(pet.energy + effect.energy),
    hygiene: clamp(pet.hygiene + effect.hygiene),
    mood: clamp(pet.mood + effect.mood),
    lastUpdatedAt: Date.now()
  }

  next.alive = evaluateAlive(next)
  return next
}

export const createInitialPet = (name = 'Brasigoto'): PetState => ({
  name,
  hunger: 75,
  energy: 75,
  hygiene: 75,
  mood: 75,
  ageTicks: 0,
  lifeStage: 'baby',
  alive: true,
  lastUpdatedAt: Date.now()
})
