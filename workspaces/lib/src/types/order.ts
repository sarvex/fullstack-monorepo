import { Entity } from '.'
import { User } from './user'
import { Drawing } from './drawing'

export const OrderStatus = {
  Pending: 'pending',
  Paid: 'paid',
  Shipped: 'shipped',
  Delivered: 'delivered',
  Cancelled: 'cancelled',
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export interface OrderItem extends Entity {
  orderItemId?: string
  orderId?: string
  drawingId?: string
  price?: number
  quantity?: number
  drawing?: Drawing
}

export interface Order extends Entity {
  orderId?: string
  userId?: string
  billingAddressId?: string
  shippingAddressId?: string

  paymentType?: PaymentType
  paymentIntentId?: string
  payment?: {
    [key: string]: unknown
  }
  total?: number
  status?: OrderStatus
  OrderItems?: OrderItem[]
  user?: User
}

export const PaymentTypes = {
  Subscription: 'subscription',
  OneTime: 'onetime',
} as const

export type PaymentType = typeof PaymentTypes[keyof typeof PaymentTypes]

export interface Payment extends Entity {
  paymentId: string
  userId: string
  orderId: string
  amount: number
  currency: string
  status?: string
}

export const CaptureStatus = {
  Successful: 'completed',
  Pending: 'pending',
  Failed: 'failed',
  Created: 'created',
} as const

export const StripeToCaptureStatusMap = {
  canceled: CaptureStatus.Failed,
  succeeded: CaptureStatus.Successful,
  processing: CaptureStatus.Pending,
  requires_action: CaptureStatus.Pending,
  requires_capture: CaptureStatus.Pending,
  requires_confirmation: CaptureStatus.Pending,
  requires_payment_method: CaptureStatus.Pending,
  unknown: CaptureStatus.Failed,
} as const

export interface Subscription extends Entity {
  subscriptionId: string
  userId: string
  orderId: string
  amount: number
  currency: string
  status?: string
  order?: Order
}
