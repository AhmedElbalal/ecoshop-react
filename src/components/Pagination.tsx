export default function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (n: number) => void }) {
  if (pages <= 1) return null
  const items = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <div className="flex gap-2">
      {items.map(n => (
        <button key={n} onClick={() => onChange(n)} className={'px-3 py-1 rounded ' + (n === page ? 'bg-black text-white' : 'bg-neutral-100')}>
          {n}
        </button>
      ))}
    </div>
  )
}
