import type { LifeStage } from '../../game/types/pet'
import StateMap from './StateMap'

interface PetAvatarProps {
  lifeStage: LifeStage
  alive: boolean
  name: string
  stateName: string
  stateCode: string
  vibe: string
}

const stageLabel: Record<LifeStage, string> = {
  baby: 'Bebê',
  child: 'Criança',
  teen: 'Adolescente',
  adult: 'Adulto'
}

export default function PetAvatar({ lifeStage, alive, name, stateName, stateCode, vibe }: PetAvatarProps) {
  return (
    <section className="card avatar">
      <div className="pet">{alive ? '🐣' : '👻'}</div>
      <h2>{name}</h2>
      <div className="map-wrap">
        <StateMap stateCode={stateCode} />
      </div>
      <p>
        Estado: {stateName} ({stateCode})
      </p>
      <p>Fase: {stageLabel[lifeStage]}</p>
      <small>{vibe}</small>
    </section>
  )
}
