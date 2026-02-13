import { useEffect, useMemo, useState } from 'react'
import ActionPanel from './features/pet-actions/ActionPanel'
import PetAvatar from './features/pet-avatar/PetAvatar'
import StatusBars from './features/pet-status/StatusBars'
import { applyAction, applyTick, createInitialPet } from './game/core/rules'
import { TICK_INTERVAL_MS } from './game/core/constants'
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

  const moodMessage = useMemo(() => {
    if (!pet.alive) return 'Seu pet não resistiu. Reinicie para tentar novamente.'
    if (pet.mood > 70) return 'Seu pet está feliz!'
    if (pet.mood > 40) return 'Tudo está sob controle.'
    return 'Seu pet precisa de atenção.'
  }, [pet])

  const handleReset = () => setPet(createInitialPet())

  return (
    <main className="container">
      <h1>Brasigotchi</h1>
      <p>{moodMessage}</p>

      <div className="grid">
        <PetAvatar lifeStage={pet.lifeStage} alive={pet.alive} />
        <StatusBars hunger={pet.hunger} energy={pet.energy} hygiene={pet.hygiene} mood={pet.mood} />
        <ActionPanel disabled={!pet.alive} onAction={(action) => setPet((current) => applyAction(current, action))} />
      </div>

      <button className="reset" onClick={handleReset}>
        Reiniciar
      </button>
    </main>
  )
}

export default App
