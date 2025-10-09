export default function Rating({ value }: { value: number }) {
  const full = Math.round(value)
  return <div className="text-yellow-500" aria-label={`Rating ${full} of 5`}>{'★'.repeat(full)}{'☆'.repeat(5-full)}</div>
}
