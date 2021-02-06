import { repairWidgetAPI } from "../../services/"
import { repairWidData, storesDetails } from "../../store/"

function getRepairLookupAPI() {
    const lookupTypes: any[] = ["repair_delivery_method", "repair_contact_method", "warranty_unit"]
    const locale: string = window.localStorage.getItem("cntLang") || "en"

    repairWidgetAPI
        .getRepairLookup(locale, lookupTypes)
        .then((res: any) => {
            // console.log("api-repairWidgetAPI => Repair-widget Lookup:", res.data)
            repairWidData.changeRepairWidgetLookup(res.data)

            /* repair_delivery_method */
            const repair_types: any[] = []
            for (let i = 0; i < res.data.repair_delivery_method.length; i++) {
                repair_types.push({
                    name: res.data.repair_delivery_method[i].code_text,
                    code: res.data.repair_delivery_method[i].code,
                    bg: "white",
                    col: "black",
                    selected: false,
                })
            }
            const apiDropOffDevices: any = {
                title: "HOW_WOULD_YOU_LIKE_TO_DROP_YOUR_DEVICE",
                types: repair_types,
            }
            repairWidData.changeApiDropOffDevices(apiDropOffDevices)

            /* repair_contact_method */
            const repair_contact_types: any[] = []
            for (let i = 0; i < res.data.repair_contact_method.length; i++) {
                repair_contact_types.push({
                    name: res.data.repair_contact_method[i].code_text,
                    code: res.data.repair_contact_method[i].code,
                    bg: "white",
                    col: "black",
                    selected: false,
                })
            }
            const receiveQuote: any = {
                title: "HOW_WOULD_YOU_LIKE_TO_RECEIVE_YOUR_QUOTE",
                types: repair_contact_types,
            }
            repairWidData.changeReceiveQuote(receiveQuote)
        })
        .catch((error) => {
            console.log("Error in get Repair-widget Lookup", error)
        })
}

function getDeliveryMethodsAPI() {
    const store_id: number = storesDetails.store_id
    const include_disabled = false

    repairWidgetAPI
        .getDeliveryMethods(store_id, include_disabled)
        .then((res: any) => {
            // console.log("api-repairWidgetAPI => Repair Delivery Method:", res.data)
            repairWidData.changeRepairWidDeliveryMethod(res.data)
        })
        .catch((error) => {
            console.log("Error in get Repair Delivery Method", error)
        })
}

async function getDeviceBrandsAPI(searchText: string) {
    const store_id: number = storesDetails.store_id
    const per_page = 10
    const page = 1
    const is_enabled = true

    await repairWidgetAPI
        .getDeviceBrands(store_id, per_page, page, is_enabled, searchText)
        .then(async (res: any) => {
            // console.log("api-repairWidgetAPI => Repair Device Brands:", res.data)
            repairWidData.changeRepairDeviceBrands(res.data)
        })
        .catch((error) => {
            console.log("Error in get Repair Device Brands", error)
        })
}

async function getBrandProductsAPI(brand_id: number, searchText: string) {
    const store_id: number = storesDetails.store_id
    const per_page = 10
    const page = 1
    const included_voided = true

    await repairWidgetAPI
        .getBrandProducts(store_id, per_page, page, included_voided, brand_id, searchText)
        .then(async (res: any) => {
            // console.log("api-repairWidgetAPI => Repair Brand Products:", res.data)
            repairWidData.changeRepairBrandProducts(res.data)
        })
        .catch((error) => {
            console.log("Error in get Repair Brand Products", error)
        })
}

async function getRepairsOfferedDeviceAPI(product_id: number) {
    const locale: string = window.localStorage.getItem("cntLang") || "en"
    const store_id: number = storesDetails.store_id
    const per_page = 20
    const page = 1
    const included_voided = false
    const name_sort_order = "asc"
    const is_active = true
    const include_cost = storesDetails.storesDetails.settings.display_repair_cost

    await repairWidgetAPI
        .getRepairsOfferedDevice(
            locale,
            store_id,
            per_page,
            page,
            included_voided,
            product_id,
            name_sort_order,
            is_active,
            include_cost
        )
        .then(async (res: any) => {
            // console.log("api-repairWidgetAPI => Repair Offered Device:", res.data)
            repairWidData.changeRepairsOfferedDevice(res.data)
        })
        .catch((error) => {
            console.log("Error in get Repair Offered Device", error)
        })
}

export {
    getRepairLookupAPI,
    getDeliveryMethodsAPI,
    getRepairsOfferedDeviceAPI,
    // postAppointmentQuoteAPI,
    getDeviceBrandsAPI,
    getBrandProductsAPI,
}
