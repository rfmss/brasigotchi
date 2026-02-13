import { describe, expect, it } from 'vitest'
import { applyAction, applyTick, createInitialPet, getEvolutionProgress, getPetCondition, getRegionalSpeech } from '../rules'

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

  it('calcula condição great quando todos os status são altos', () => {
    const pet = createInitialPet()
    expect(getPetCondition(pet)).toBe('great')
  })

  it('calcula progresso de evolução por fase', () => {
    const progress = getEvolutionProgress(18)
    expect(progress.current).toBe('Criança')
    expect(progress.next).toBe('Adolescente')
  })

  it('cria pet com identidade de estado brasileiro', () => {
    const pet = createInitialPet({
      id: 'MG',
      stateName: 'Minas Gerais',
      mascotName: 'Mineirogotchi',
      slangGreeting: 'Uai, sô!',
      vibe: 'Aconchegante',
      favoriteFoods: ['pão de queijo']
    })

    expect(pet.stateCode).toBe('MG')
    expect(pet.name).toBe('Mineirogotchi')
    expect(pet.favoriteFoods.length).toBeGreaterThan(0)
  })

  it('gera fala regional baseada na condição', () => {
    const pet = createInitialPet({
      id: 'BA',
      stateName: 'Bahia',
      mascotName: 'Baianogotchi',
      slangGreeting: 'Oxente!',
      vibe: 'Alegre',
      favoriteFoods: ['acarajé']
    })

    expect(getRegionalSpeech(pet, 'great')).toContain('Oxente!')
  })
})
