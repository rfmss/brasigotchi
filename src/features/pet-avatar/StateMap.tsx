import { getStateShape } from '../../game/data/stateShapes'

interface StateMapProps {
  stateCode: string
}

export default function StateMap({ stateCode }: StateMapProps) {
  const shape = getStateShape(stateCode)

  if (!shape) {
    return <div className="state-map-fallback">🗺️</div>
  }

  return (
    <svg className="state-map" viewBox={shape.viewBox} role="img" aria-label={`Mapa estilizado de ${stateCode}`}>
      <path d={shape.path} />
    </svg>
  )
}
