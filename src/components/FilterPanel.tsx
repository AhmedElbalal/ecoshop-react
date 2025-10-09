export default function FilterPanel({
  categories,
  category,
  onCategory,
  price,
  onPrice
}: {
  categories: string[]
  category: string | null
  onCategory: (c: string | null) => void
  price: [number, number]
  onPrice: (p: [number, number]) => void
}) {
  return (
    <div className="space-y-3">
      <select value={category || ''} onChange={e => onCategory(e.target.value || null)} className="w-full border rounded-xl px-3 py-2">
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <div className="flex items-center gap-3">
        <input type="number" value={price[0]} onChange={e => onPrice([Number(e.target.value) || 0, price[1]])} className="w-1/2 border rounded-xl px-3 py-2" aria-label="Min price" />
        <input type="number" value={price[1]} onChange={e => onPrice([price[0], Number(e.target.value) || 0])} className="w-1/2 border rounded-xl px-3 py-2" aria-label="Max price" />
      </div>
    </div>
  )
}
