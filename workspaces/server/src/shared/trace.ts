/* eslint-disable no-console */
import express from 'express'
import axios from 'axios'
import { config } from './config'
import { decodeToken } from './auth'
import { getRoutesFromApp } from './server'
import logger from './logger'

export function endpointTracingMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const methods = ['POST', 'PUT', 'PATCH', 'DELETE']
  const endpoints = ['/cart']
  if (!config.trace || !endpoints.includes(req.originalUrl) || !methods.includes(req.method)) {
    return next()
  }
  const token = req.headers.authorization?.replace('Bearer ', '') || ''
  if (config.auth.trace) {
    console.log('Token: ', token)
  }
  const decoded = decodeToken(token)
  console.log('\x1b[34m%s\x1b[0m', '******** INBOUND TRACE ** ')
  console.table({
    method: req.method,
    endpoint: req.originalUrl,
    tokenOk: !!decoded,
    userId: decoded?.userId,
  })
  if (req.body) {
    console.table(req.body)
  }
  next()
}

export function activateAxiosTrace() {
  axios.interceptors.request.use(req => {
    // orange console log
    console.log(
      '\x1b[33m%s\x1b[0m',
      '> OUTBOUND TRACE ** ',
      req.method?.toUpperCase() || 'Request',
      req.url,
      config.trace ? req.data : '',
    )
    return req
  })

  axios.interceptors.response.use(req => {
    console.log('> Response:', req.status, req.statusText, config.trace ? req.data : '')
    return req
  })
}

export function printRouteSummary(app: express.Application) {
  if (!config.trace) {
    return
  }
  logger.info('******** ROUTE SUMMARY ********')
  const report = getRoutesFromApp(app).filter(r => r.from !== 'model-api')
  console.log(report)
}

export default logger
