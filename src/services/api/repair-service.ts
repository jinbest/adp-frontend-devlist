import Config from '../../config/config'
import AuthenticatedApiClient from "../authenticated/authenticated-api-client"
import { GetManyResponse } from "../../pages/repair/model/get-many-response"
import { GetBrandsParam } from "../../pages/repair/model/get-brands-params"
import { GetProductsParam } from "../../pages/repair/model/get-products-params"
import { GetOfferedRepairs } from "../../pages/repair/model/get-offered-repair-params"
import { GetDeliveryMethodParams } from "../../pages/repair/model/get-delivery-method-params"
import { PostAppointParams } from "../../pages/repair/model/post-appointment-params"

export class RepairService {
  private static instance: RepairService
  private readonly apiClient: AuthenticatedApiClient

  private constructor() {
    this.apiClient = AuthenticatedApiClient.getInstance()
  }

  static getInstance(): RepairService {
    if (!RepairService.instance) {
      RepairService.instance = new RepairService()
    }
    return RepairService.instance
  }

  async getBrands(storeID: number, params: GetBrandsParam): Promise<GetManyResponse> {
    return this.apiClient.get<GetManyResponse>(
      `${Config.PRODUCT_SERVICE_API_URL}/dc/store/${storeID}/brands`,
      params
    )
  }

  async getProducts(storeID: number, params: GetProductsParam): Promise<GetManyResponse> {
    return this.apiClient.get<GetManyResponse>(
      `${Config.PRODUCT_SERVICE_API_URL}/dc/store/${storeID}/products`,
      params
    )
  }

  async getOfferedRepairs(locale:string, storeID:number, params: GetOfferedRepairs): Promise<GetManyResponse> {
    return this.apiClient.get<GetManyResponse>(
      `${Config.REPAIR_SERVICE_API_URL}/dc/${locale}/store/${storeID}/repair`,
      params
    )
  }

  async getDeliveryMethod(storeID:number, params: GetDeliveryMethodParams): Promise<any[]> {
    return this.apiClient.get<any[]>(
      `${Config.REPAIR_SERVICE_API_URL}/dc/store/${storeID}/delivery_methods`,
      params
    )
  }

  async postAppointment(storeID:number, locID:number, params: PostAppointParams): Promise<any[]> {
    return this.apiClient.post<any[]>(
      `${Config.REPAIR_SERVICE_API_URL}/dc/store/${storeID}/repair/location/${locID}/appointment`,
      params
    )
  }


}