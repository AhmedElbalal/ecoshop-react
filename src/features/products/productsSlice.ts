import { createSlice } from '@reduxjs/toolkit'
import data from '../../data/products.json'
import type { Product } from '../../types'

type State = { items: Product[] }
const initialState: State = { items: data as Product[] }

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
})

export default slice.reducer
