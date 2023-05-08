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
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const savedTokenValue = ''
 
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
      console.log('LocalState: ', savedTokenValue)
    }
 

  const config = {
    headers: { Authorization: `Bearer ${savedTokenValue}` }
  }
  const response = await axios.get('https://cms.smarttesting.tech/restAPI/RestAPICrude', config)


  return response.data
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
      }
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/RestAPICrude',
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
  };

    const response = await axios(config)
   
    dispatch(fetchData(getState().user.params))
 
    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
      if (localStorage) {
        const savedTokenValue = localStorage.getItem('authKey')
        console.log('LocalState: ', savedTokenValue)
      }
 
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.post('https://cms.smarttesting.tech/restAPI/RestAPICrude/delete/'+id, config)
  
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Edit User
export const editUser = createAsyncThunk(
  'appUsers/editUser',
  async (id: number | string) => {
    const savedTokenValue = ''
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
    const config = {
      headers: { Authorization: `Bearer ${savedTokenValue}` }
    }
    const response = await axios.get('https://cms.smarttesting.tech/restAPI/RestAPICrude/'+id, config)

    return response.data
  }
)

// ** Update User
export const updateUser = createAsyncThunk(
  'appUsers/updateUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const savedTokenValue = ''
    let obj = {
      fullName:data.firstname,
      email: data.email,
      contact: data.contact_no,
      company: data.company,
      role: data.role,
      username: data.username,
      country: data.country,
      current_plan: data.current_plan,
      password: data.password
    }
   
    if (localStorage) {
      const savedTokenValue = localStorage.getItem('authKey')
    }
      
    const config = {
      method: 'post',
      url: 'https://cms.smarttesting.tech/restAPI/api/RestAPICrude/'+data.id,
      headers: {
          'Authorization': `Bearer ${savedTokenValue}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: obj
    };
 
    const response = await axios(config)
   
    dispatch(fetchData(getState().user.params))
 
    return response.data
  }
)


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editData:{ id: "",
    role: '',
    password: '',
    username: '',
    country: '',
    company: '',
    contact_no: '',
    current_plan: '',
    firstname: '',
    email: '',}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.Users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(editUser.fulfilled, (state, action) =>{
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.editData = action.payload
    })
  }
})

export default appUsersSlice.reducer
function checkWindow(arg0: string | null) {
  throw new Error('Function not implemented.')
}
