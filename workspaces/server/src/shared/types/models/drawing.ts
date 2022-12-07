import { DataTypes } from 'sequelize'
import { Drawing } from '@shared/lib'
import { UserModel } from './user'
import { addModel } from '../../db'

export const DrawingModel = addModel<Drawing>('drawing', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
  },
  history: {
    type: DataTypes.JSONB,
  },
  thumbnail: {
    type: DataTypes.TEXT,
  },
  private: {
    type: DataTypes.BOOLEAN,
  },
  sell: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
})

DrawingModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
})
