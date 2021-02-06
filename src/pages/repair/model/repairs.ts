import { Discount } from "./discount"
import { Product } from "./product"

export interface Repairs {
  id: string
  store_id: string
  product: Product
  title: string
  duration: number
  cost: number
  display_cost: boolean
  discounts: Discount[]
  warranty: number
  warranty_unit: number
  is_active: boolean
  is_voided: boolean
  created_by: string
  created_date: string
  modified_by: string
  modified_date: string
  deleted_by: string
  deleted_date: string
}
