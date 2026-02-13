import {
  ACTION_EFFECTS,
  CRITICAL_THRESHOLD,
  DANGER_THRESHOLD,
  EVOLUTION_LABELS,
  EVOLUTION_TICKS,
  MAX_STAT,
  MIN_STAT,
  TICK_DECAY
} from './constants'
import type { PetAction, PetState } from '../types/pet'
import { getRandomPersona, type StatePersona } from '../data/statePersonas'

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

export const getNeedsAttention = (pet: PetState) => {
  return {
    hunger: pet.hunger <= DANGER_THRESHOLD,
    energy: pet.energy <= DANGER_THRESHOLD,
    hygiene: pet.hygiene <= DANGER_THRESHOLD,
    mood: pet.mood <= DANGER_THRESHOLD
  }
}

export const getPetCondition = (pet: PetState): 'great' | 'ok' | 'danger' | 'critical' => {
  const values = [pet.hunger, pet.energy, pet.hygiene, pet.mood]
  const criticalCount = values.filter((v) => v <= CRITICAL_THRESHOLD).length
  const dangerCount = values.filter((v) => v <= DANGER_THRESHOLD).length

  if (criticalCount >= 2) return 'critical'
  if (dangerCount >= 2) return 'danger'
  if (values.every((v) => v >= 70)) return 'great'
  return 'ok'
}

export const getEvolutionProgress = (ageTicks: number) => {
  if (ageTicks < EVOLUTION_TICKS.child) {
    return {
      current: EVOLUTION_LABELS.baby,
      next: EVOLUTION_LABELS.child,
      progress: Math.round((ageTicks / EVOLUTION_TICKS.child) * 100)
    }
  }

  if (ageTicks < EVOLUTION_TICKS.teen) {
    return {
      current: EVOLUTION_LABELS.child,
      next: EVOLUTION_LABELS.teen,
      progress: Math.round(((ageTicks - EVOLUTION_TICKS.child) / (EVOLUTION_TICKS.teen - EVOLUTION_TICKS.child)) * 100)
    }
  }

  if (ageTicks < EVOLUTION_TICKS.adult) {
    return {
      current: EVOLUTION_LABELS.teen,
      next: EVOLUTION_LABELS.adult,
      progress: Math.round(((ageTicks - EVOLUTION_TICKS.teen) / (EVOLUTION_TICKS.adult - EVOLUTION_TICKS.teen)) * 100)
    }
  }

  return {
    current: EVOLUTION_LABELS.adult,
    next: null,
    progress: 100
  }
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

export const getRegionalSpeech = (pet: PetState, condition: 'great' | 'ok' | 'danger' | 'critical') => {
  if (!pet.alive) return `${pet.slangGreeting} Eita... preciso de mais cuidado da próxima vez!`
  if (condition === 'great') return `${pet.slangGreeting} Tô feliz demais, visse?`
  if (condition === 'danger') return `${pet.slangGreeting} Tô precisando de um trato aqui, viu!`
  if (condition === 'critical') return `${pet.slangGreeting} Socorro! Tá puxado por aqui!`
  return `${pet.slangGreeting} Bora continuar nessa jornada!`
}

export const getFeedSuggestion = (pet: PetState) => {
  const index = pet.ageTicks % pet.favoriteFoods.length
  return pet.favoriteFoods[index]
}

export const createInitialPet = (persona?: StatePersona): PetState => {
  const selectedPersona = persona ?? getRandomPersona()

  return ({
  name: selectedPersona.mascotName,
  hunger: 75,
  energy: 75,
  hygiene: 75,
  mood: 75,
  ageTicks: 0,
  lifeStage: 'baby',
  alive: true,
  lastUpdatedAt: Date.now(),
  stateCode: selectedPersona.id,
  stateName: selectedPersona.stateName,
  slangGreeting: selectedPersona.slangGreeting,
  vibe: selectedPersona.vibe,
  favoriteFoods: selectedPersona.favoriteFoods
})
}
