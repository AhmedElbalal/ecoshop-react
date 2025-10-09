import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { load, save } from '../../utils/storage'

type Item = { id: number; qty: number }
type State = { items: Item[] }

const initialState: State = load<State>('cart', { items: [] })

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ id: number; qty?: number }>) {
      const { id, qty = 1 } = action.payload
      const f = state.items.find(i => i.id === id)
      if (f) f.qty += qty
      else state.items.push({ id, qty })
      save('cart', state)
    },
    remove(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
      save('cart', state)
    },
    setQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const f = state.items.find(i => i.id === action.payload.id)
      if (f) f.qty = Math.max(1, action.payload.qty)
      save('cart', state)
    },
    clear(state) {
      state.items = []
      save('cart', state)
    }
  }
})

export const { add, remove, setQty, clear } = slice.actions
export default slice.reducer
