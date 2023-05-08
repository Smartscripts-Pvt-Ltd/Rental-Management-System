import React, { useState, useEffect } from 'react'

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// let [savedTokenValue] = useState(null)

// useEffect(() => {

//   if (localStorage.getItem('authKey')) {
//     savedTokenValue = localStorage.getItem('authKey')
//   } else {
//     savedTokenValue = ""
//   });

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

// ** Fetch Users
export const fetchDataProduct = createAsyncThunk('appUsers/fetchDataProduct', async (params: DataParams) => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/product/list', config)


  return response.data
})

// ** Add User
export const addProduct = createAsyncThunk(
  'addProducts/addProduct',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
      }
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/product/add',
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
  };

    const response = await axios(config)
   
    dispatch(fetchDataProduct(getState().user.params))
 
    return response.data
  }
)

// ** Delete User
export const deleteProduct = createAsyncThunk(
  'appProducts/deleteProduct',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
        console.log('LocalState: ', savedTokenValue)
      }
 
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.post('https://cms.smarttesting.tech/restAPI/api/product/delete/'+id, config)
  
    dispatch(fetchDataProduct(getState().user.params))

    return response.data
  }
)

// ** Edit User
export const editProduct = createAsyncThunk(
  'appProducts/editProduct',
  async (id: number | string) => {
    const savedTokenValue = ''
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.get('https://cms.smarttesting.tech/restAPI/api/product/edit/'+id, config)

    return response.data
  }
)

// ** Update User
export const updateProduct = createAsyncThunk(
  'appProducts/updateProduct',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
    let obj = {
      name: data.name,
      category: data.category,
      sub_category: data.sub_category,
      specification: data.specification,
      description: data.description,
      image: data.image,
      status: data.status,
    }
   
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
      
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/product/edit/'+data.id,
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: obj
    };
 
    const response = await axios(config)
   
    dispatch(fetchDataProduct(getState().user.params))
 
    return response.data
  }
)


export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editData:{ id: "",
    name: '',
    category: '',
    sub_category: '',
    specification: '',
    description: '',
    image: '',
    status: ''}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDataProduct.fulfilled, (state, action) => {
      state.data = action.payload.Products
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(editProduct.fulfilled, (state, action) =>{
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.editData = action.payload
    })
  }
})

export default appProductsSlice.reducer
function checkWindow(arg0: string | null) {
  throw new Error('Function not implemented.')
}
