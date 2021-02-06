export interface AppointmentRepair {
  id?: string
  appointment_id: number
  repair_id: number
  product_id: number
  title?: string
  cost: number
  discount?: number
  warranty: number
  warranty_unit: string
  product_name: string
  duration: string
  repair_name: string
}
