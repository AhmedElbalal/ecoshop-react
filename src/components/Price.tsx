import { formatCurrency } from '../utils/currency'
export default function Price({ value, currency }: { value: number; currency: string }) {
  return <span>{formatCurrency(value, currency)}</span>
}
