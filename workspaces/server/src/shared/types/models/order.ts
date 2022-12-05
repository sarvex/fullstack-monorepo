import { DataTypes } from 'sequelize'
import { addModel } from '../../db'
import { Order } from '@shared/lib'

export const OrderModel = addModel<Order>('order', {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
})
