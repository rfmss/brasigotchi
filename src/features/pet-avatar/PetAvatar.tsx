import type { LifeStage } from '../../game/types/pet'

interface PetAvatarProps {
  lifeStage: LifeStage
  alive: boolean
}

const stageLabel: Record<LifeStage, string> = {
  baby: 'Bebê',
  child: 'Criança',
  teen: 'Adolescente',
  adult: 'Adulto'
}

export default function PetAvatar({ lifeStage, alive }: PetAvatarProps) {
  return (
    <section className="card avatar">
      <div className="pet">{alive ? '🐣' : '👻'}</div>
      <h2>{alive ? 'Brasigoto' : 'Fim de jogo'}</h2>
      <p>Fase: {stageLabel[lifeStage]}</p>
    </section>
  )
}
