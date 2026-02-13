import { describe, expect, it } from 'vitest'
import { applyAction, applyTick, createInitialPet } from '../rules'

describe('game rules', () => {
  it('reduz status com tick', () => {
    const pet = createInitialPet()
    const next = applyTick(pet)

    expect(next.hunger).toBeLessThan(pet.hunger)
    expect(next.energy).toBeLessThan(pet.energy)
    expect(next.ageTicks).toBe(pet.ageTicks + 1)
  })

  it('aplica ação de alimentar', () => {
    const pet = createInitialPet()
    const next = applyAction(pet, 'feed')

    expect(next.hunger).toBeGreaterThanOrEqual(pet.hunger)
  })
})
