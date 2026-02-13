import { useEffect, useMemo, useState } from 'react'
import ActionPanel from './features/pet-actions/ActionPanel'
import PetAvatar from './features/pet-avatar/PetAvatar'
import StatusBars from './features/pet-status/StatusBars'
import { TICK_INTERVAL_MS } from './game/core/constants'
import {
  applyAction,
  applyTick,
  createInitialPet,
  getEvolutionProgress,
  getNeedsAttention,
  getPetCondition
} from './game/core/rules'
import type { PetState } from './game/types/pet'
import { loadPet, savePet } from './services/storage'

function App() {
  const [pet, setPet] = useState<PetState>(() => loadPet() ?? createInitialPet())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPet((current) => (current.alive ? applyTick(current) : current))
    }, TICK_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    savePet(pet)
  }, [pet])

  const condition = getPetCondition(pet)
  const attention = getNeedsAttention(pet)
  const evolution = getEvolutionProgress(pet.ageTicks)

  const moodMessage = useMemo(() => {
    if (!pet.alive) return 'Seu pet não resistiu. Reinicie para tentar novamente.'
    if (condition === 'great') return 'Excelente! Todos os status estão altos.'
    if (condition === 'danger') return 'Atenção: dois ou mais status estão em risco.'
    if (condition === 'critical') return 'Crítico! Cuide do pet imediatamente.'
    return 'Tudo sob controle, mas continue cuidando.'
  }, [pet.alive, condition])

  const handleReset = () => setPet(createInitialPet())

  return (
    <main className="container">
      <h1>Brasigotchi</h1>
      <p className={`message message-${condition}`}>{moodMessage}</p>

      <section className="card evolution">
        <h2>Evolução</h2>
        <p>
          Fase atual: <strong>{evolution.current}</strong>
          {evolution.next ? (
            <>
              {' '}
              → próxima: <strong>{evolution.next}</strong>
            </>
          ) : null}
        </p>
        <progress max={100} value={evolution.progress} />
        <small>{evolution.progress}%</small>
      </section>

      <div className="grid">
        <PetAvatar lifeStage={pet.lifeStage} alive={pet.alive} />
        <StatusBars
          hunger={pet.hunger}
          energy={pet.energy}
          hygiene={pet.hygiene}
          mood={pet.mood}
          danger={attention}
        />
        <ActionPanel disabled={!pet.alive} onAction={(action) => setPet((current) => applyAction(current, action))} />
      </div>

      <button className="reset" onClick={handleReset}>
        Reiniciar
      </button>
    </main>
  )
}

export default App
