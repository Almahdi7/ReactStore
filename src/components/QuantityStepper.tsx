interface Props {
  value: number
  max: number
  onChange: (value: number) => void
}

export default function QuantityStepper({ value, max, onChange }: Props) {
  const btn = 'flex h-11 w-11 items-center justify-center hover:bg-canvas-alt disabled:opacity-40'
  return (
    <div className="inline-flex items-center border border-ink">
      <button aria-label="Decrease quantity" className={btn} disabled={value <= 1} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="w-10 text-center">{value}</span>
      <button aria-label="Increase quantity" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  )
}