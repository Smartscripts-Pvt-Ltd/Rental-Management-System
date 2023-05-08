import React, { useState, useEffect } from 'react'

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Categories
export const fetchDataCategory = createAsyncThunk('appCategory/fetchDataCategory', async (params: DataParams) => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/category/list', config)


  return response.data
})

// ** Fetch Categories active
export const fetchDataActiveCategory = createAsyncThunk('appSubCategory/fetchDataActiveCategory', async () => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/category/active-records', config)


  return response.data
})

// ** Add Category
export const addCategory = createAsyncThunk(
  'appCategory/addCategory',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
      }
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/category/add',
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
  };

    const response = await axios(config)
   
    dispatch(fetchDataCategory(getState().user.params))
 
    return response.data
  }
)

// ** Delete Category
export const deleteCategory = createAsyncThunk(
  'appCategory/deleteCategory',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
        console.log('LocalState: ', savedTokenValue)
      }
 
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.post('https://cms.smarttesting.tech/restAPI/api/category/delete/'+id, config)
  
    dispatch(fetchDataCategory(getState().user.params))

    return response.data
  }
)

// ** Edit Category
export const editCategory = createAsyncThunk(
  'appCategory/editCategory',
  async (id: number | string) => {
    const savedTokenValue = ''
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/category/edit/'+id, config)

    return response.data
  }
)

// ** Update Category
export const updateCategory = createAsyncThunk(
  'appCategory/updateCategory',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
    let obj = {
      category_name: data.category_name,
      abbreavation: data.abbreavation,
      description: data.description,
      status: data.status,
      image : data.image,
    }
   
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
      
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/category/edit/'+data.id,
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: obj
    };
 
    const response = await axios(config)
   
    dispatch(fetchDataCategory(getState().user.params))
 
    return response.data
  }
)


export const appCategorySlice = createSlice({
  name: 'appCategory',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editData:{  
      id: "",
      category_name: "",
      abbreavation: "",
      description: "",
      status: "",
      image : ""
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDataCategory.fulfilled, (state, action) => {
      debugger;
      state.data = action.payload.Categories
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(fetchDataActiveCategory.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload
    })
    builder.addCase(editCategory.fulfilled, (state, action) =>{
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.editData = action.payload
    })
  }
})

export default appCategorySlice.reducer
function checkWindow(arg0: string | null) {
  throw new Error('Function not implemented.')
}
