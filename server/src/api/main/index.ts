import express from 'express'
import { DrawingModel } from '../../types'
import { list } from '../_auto/controller'

const router = express.Router()

router.get('/gallery', async (req, res) => {
  const items = await list(DrawingModel, {
    where: { private: true },
  })
  res.json(items)
})

export default router
