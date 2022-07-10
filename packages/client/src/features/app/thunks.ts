import { AnyAction, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { AppUser, onLogin } from '../../shared/auth'
import { RootState } from '../../shared/store'
import { notifyError, patch } from './slice'

export enum Method {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
}

/**
 * Axios wrapper for thunks with token from onLogin
 */
export async function request(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  url: string,
  data?: any,
  method: Method = Method.POST
): Promise<AxiosResponse<{ success: true } | any>> {
  let response: AxiosResponse
  try {
    dispatch(patch({ loading: true }))
    response = await axios({
      url,
      data,
      method,
      timeout: 10000,
    })
  } catch (error: any) {
    dispatch(notifyError(error?.response?.data?.message || error.message))
    throw error
  } finally {
    dispatch(patch({ loading: false }))
  }
  return response
}

function setLogin(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  token: string,
  user: AppUser
) {
  dispatch(
    patch({
      token,
      user,
    })
  )
  onLogin({ token, user })
}

export const LoginAsync = createAsyncThunk(
  'app/login',
  async (payload: Record<string, unknown>, { dispatch }) => {
    const response = await request(dispatch, 'profile/login', payload)
    setLogin(dispatch, response.data.token, response.data.user)
  }
)

export const RegisterAsync = createAsyncThunk(
  'app/register',
  async (payload: Record<string, unknown>, { dispatch }) => {
    const response = await request(dispatch, 'profile/register', payload)
    //For email validation rework this
    setLogin(dispatch, response.data.token, response.data.user)
  }
)

export const LogoutAsync = createAsyncThunk(
  'app/logout',
  async (_, { dispatch }) => {
    request(dispatch, 'profile/logoff')
    dispatch(patch({ token: undefined, user: undefined }))
    onLogin(undefined)
  }
)

export const EditProfileAsync = createAsyncThunk(
  'app/editProfile',
  async (payload: Record<string, unknown>, { dispatch, getState }) => {
    const response = await request(dispatch, 'profile/edit', payload)
    const user = response.data.user
    if (user) {
      const token = (getState() as RootState)?.app?.token as string
      dispatch(patch({ user }))
      onLogin({ token, user })
    }
  }
)