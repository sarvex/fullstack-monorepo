import React from 'react'
export interface AppRoute {
  path: string
  component: React.LazyExoticComponent<() => JSX.Element>
  title?: string
  description?: string
  secure?: boolean
  animate?: string
  popup?: boolean
  link?: boolean
  profile?: boolean
  hideFooter?: boolean
  params?: string[]
}

export const Paths = {
  Login: `/login`,
  Register: `/register`,
  Draw: `/draw`,
}

export const routes: AppRoute[] = [
  {
    title: 'Home',
    path: '/',
    component: React.lazy(() => import('../features/home')),
  },
  {
    title: 'Login',
    path: Paths.Login,
    component: React.lazy(() => import('../features/profile/Login')),
    profile: true,
  },
  {
    title: 'Register',
    path: '/register',
    component: React.lazy(() => import('../features/profile/Register')),
    profile: true,
  },
  {
    title: 'Profile',
    path: '/profile',
    component: React.lazy(() => import('../features/profile/Edit')),
    profile: true,
    secure: true,
  },
  {
    title: 'Your Canvas',
    path: Paths.Draw,
    component: React.lazy(() => import('../features/canvas')),
    secure: false,
    hideFooter: true,
    link: true,
    params: ['/:id'],
  },
  {
    title: 'Authenticating...',
    path: '/callback',
    popup: true,
    component: React.lazy(() => import('../features/profile/Callback')),
  },
]

export const currentRoute = () => routes.find(r => r.path === window.location.pathname)

export default routes