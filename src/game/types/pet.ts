export type LifeStage = 'baby' | 'child' | 'teen' | 'adult'

export interface PetState {
  name: string
  hunger: number
  energy: number
  hygiene: number
  mood: number
  ageTicks: number
  lifeStage: LifeStage
  alive: boolean
  lastUpdatedAt: number
}

export type PetAction = 'feed' | 'play' | 'sleep' | 'clean'
