export interface ContactSubmitParams {
  id: number
  store_id: number
  location_id: number
  customer_id: number
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone?: string
  customer_note: string
  read_date: string
  is_read: boolean
  created_by: string
  created_date: string
  modified_by: string
  modified_date: string
  deleted_by: string
  deleted_date: string  
}
