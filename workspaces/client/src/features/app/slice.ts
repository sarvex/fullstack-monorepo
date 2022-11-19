import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppUser, getPersistedAuthFromStorage } from '../../shared/auth'
import { AppNotification, NotificationSeverity } from './types'

export interface AppState {
  user?: AppUser
  token?: string
  darkTheme: boolean
  notifications: AppNotification[]
  drawerLeftOpen?: boolean
  drawerRightOpen?: boolean
  loading?: boolean
  loaded?: boolean
  dialog?: string
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
const defaultState: AppState = {
  darkTheme: !!prefersDark,
  notifications: [],
}

const persistedAuth = getPersistedAuthFromStorage()
const initialState = {
  ...defaultState,
  token: persistedAuth?.token,
  user: persistedAuth?.user,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    patch: (state, action: PayloadAction<Partial<AppState>>) => {
      return { ...state, ...action.payload }
    },
    notify: (state, action: PayloadAction<string>) => {
      state.notifications.push({
        message: action.payload,
        id: new Date().getTime().toString(),
        severity: NotificationSeverity.info,
      })
    },
    notifyError: (state, action: PayloadAction<string>) => {
      state.notifications.push({
        message: action.payload,
        id: new Date().getTime().toString(),
        severity: NotificationSeverity.error,
      })
    },
  },
})

export const { patch, notify, notifyError } = slice.actions

export default slice.reducer