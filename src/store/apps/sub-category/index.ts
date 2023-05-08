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
export const fetchDataSubCategory = createAsyncThunk('appSubCategory/fetchDataSubCategory', async (params: DataParams) => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/sub-category/list', config)


  return response.data
})

// ** Fetch Categories active
export const fetchDataActiveSubCategory = createAsyncThunk('appSubCategory/fetchDataActiveSubCategory', async () => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/sub-category/active-records', config)


  return response.data
})

// ** Add Category
export const addSubCategory = createAsyncThunk(
  'appSubCategory/addSubCategory',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
      }
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/sub-category/add',
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
  };

    const response = await axios(config)
   
    dispatch(fetchDataSubCategory(getState().user.params))
 
    return response.data
  }
)

// ** Delete Category
export const deleteSubCategory = createAsyncThunk(
  'appSubCategory/deleteSubCategory',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
        console.log('LocalState: ', savedTokenValue)
      }
 
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.post('https://cms.smarttesting.tech/restAPI/api/sub-category/delete/'+id, config)
  
    dispatch(fetchDataSubCategory(getState().user.params))

    return response.data
  }
)

// ** Edit Category
export const editSubCategory = createAsyncThunk(
  'appSubCategory/editSubCategory',
  async (id: number | string) => {
    const savedTokenValue = ''
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/sub-category/edit/'+id, config)

    return response.data
  }
)

// ** Update Category
export const updateSubCategory = createAsyncThunk(
  'appSubCategory/updateSubCategory',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
    let obj = {
      sub_catname: data.sub_catname,
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
      url: 'https://cms.smarttesting.tech/restAPI/api/sub-category/edit/'+data.id,
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: obj
    };
 
    const response = await axios(config)
   
    dispatch(fetchDataSubCategory(getState().user.params))
 
    return response.data
  }
)


export const appSubCategorySlice = createSlice({
  name: 'appSubCategory',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editData:{ 
      id: "",
      sub_catname: "",
      abbreavation: "",
      description: "",
      status: "",
      image : ""
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDataSubCategory.fulfilled, (state, action) => {
      state.data = action.payload['Sub-Categories']
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(fetchDataActiveSubCategory.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload
    })
    builder.addCase(editSubCategory.fulfilled, (state, action) =>{
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.editData = action.payload
    })
  }
})

export default appSubCategorySlice.reducer
function checkWindow(arg0: string | null) {
  throw new Error('Function not implemented.')
}
