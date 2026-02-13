import type { PetState } from '../game/types/pet'

const STORAGE_KEY = 'brasigotchi:pet'

export const savePet = (pet: PetState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet))
}

export const loadPet = (): PetState | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as PetState
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}
