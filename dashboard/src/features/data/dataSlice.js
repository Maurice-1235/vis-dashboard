import { createSlice } from '@reduxjs/toolkit'

export const dataReducer = createSlice({
  name: 'data',
  initialState: {
    selectIds: [],
    dimensions: [],
    values: [],
    dimData: [],
    graph: {
      links: [],
      nodes: []
    },
    ranks: [],
    selectRank: 0,
  },
  reducers: {
    setSelectIds: (state, action) => {
      if (state.selectIds.toString() === action.payload.toString()) {
        return
      }
      if (action.payload.length === 0) {
        let selected_ids = []
        for (let i in state.values) {
          selected_ids.push(+i)
        }
        state.selectIds = selected_ids
      } else {
        state.selectIds = action.payload
      }
      
    },
    setDimensions: (state, action) => {
      state.dimensions = action.payload
    },
    setValues: (state, action) => {
      state.values = action.payload
    },
    setDimData: (state, action) => {
      state.dimData = action.payload
    },
    setGraph: (state, action) => {
      state.graph = action.payload
    },
    setRanks: (state, action) => {
      state.ranks = action.payload
    },
    setSelectRank: (state, action) => {
      state.selectRank = action.payload
    }
  }
})
export const { setSelectIds,setDimensions, setValues, setDimData, setGraph, setRanks, setSelectRank} = dataReducer.actions

export default dataReducer.reducer