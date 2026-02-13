import type { LifeStage } from '../../game/types/pet'

interface PetAvatarProps {
  lifeStage: LifeStage
  alive: boolean
  name: string
  stateName: string
  vibe: string
}

const stageLabel: Record<LifeStage, string> = {
  baby: 'Bebê',
  child: 'Criança',
  teen: 'Adolescente',
  adult: 'Adulto'
}

export default function PetAvatar({ lifeStage, alive, name, stateName, vibe }: PetAvatarProps) {
  return (
    <section className="card avatar">
      <div className="pet">{alive ? '🐣' : '👻'}</div>
      <h2>{name}</h2>
      <p>Estado: {stateName}</p>
      <p>Fase: {stageLabel[lifeStage]}</p>
      <small>{vibe}</small>
    </section>
  )
}
