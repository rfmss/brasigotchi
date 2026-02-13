import type { PetAction } from '../../game/types/pet'

interface ActionPanelProps {
  disabled: boolean
  onAction: (action: PetAction) => void
}

const actions: Array<{ id: PetAction; label: string }> = [
  { id: 'feed', label: '🍎 Alimentar' },
  { id: 'play', label: '🎾 Brincar' },
  { id: 'sleep', label: '🛌 Dormir' },
  { id: 'clean', label: '🧽 Limpar' }
]

export default function ActionPanel({ disabled, onAction }: ActionPanelProps) {
  return (
    <section className="card">
      <h2>Ações</h2>
      <div className="actions-grid">
        {actions.map((action) => (
          <button key={action.id} disabled={disabled} onClick={() => onAction(action.id)}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}
