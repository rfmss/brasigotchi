interface StatusBarsProps {
  hunger: number
  energy: number
  hygiene: number
  mood: number
  danger: {
    hunger: boolean
    energy: boolean
    hygiene: boolean
    mood: boolean
  }
}

const rows: Array<{ key: keyof Pick<StatusBarsProps, 'hunger' | 'energy' | 'hygiene' | 'mood'>; label: string }> = [
  { key: 'hunger', label: 'Fome' },
  { key: 'energy', label: 'Energia' },
  { key: 'hygiene', label: 'Higiene' },
  { key: 'mood', label: 'Humor' }
]

export default function StatusBars(props: StatusBarsProps) {
  return (
    <section className="card">
      <h2>Status</h2>
      {rows.map(({ key, label }) => {
        const value = props[key]
        return (
          <div className={`status-row ${props.danger[key] ? 'status-danger' : ''}`} key={key}>
            <span>{label}</span>
            <progress max={100} value={value} />
            <strong>{value}</strong>
          </div>
        )
      })}
    </section>
  )
}
