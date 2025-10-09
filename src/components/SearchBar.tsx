export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search products"
      className="w-full border rounded-xl px-4 py-2"
      aria-label="Search products"
    />
  )
}
