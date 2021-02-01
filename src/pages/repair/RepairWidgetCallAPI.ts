import { repairWidgetAPI } from '../../services/'
import { repairWidData, repairWidgetStore, storesDetails } from '../../store/'

function getRepairLookupAPI() {
  const lookupTypes:any[] = [
    'repair_delivery_method',
    'repair_contact_method',
    'warranty_unit'
  ]
  const locale:string = window.localStorage.getItem('cntLang') || 'en';

  repairWidgetAPI
    .getRepairLookup(locale, lookupTypes)
    .then((res:any) => {
      console.log('api-repairWidgetAPI => Repair-widget Lookup:', res.data);
      repairWidData.changeRepairWidgetLookup(res.data);

      /* repair_delivery_method */
      const repair_types:any[] = [];
      for (let i = 0; i < res.data.repair_delivery_method.length; i++) {
        repair_types.push(
          {
            name: res.data.repair_delivery_method[i].code_text,
            code: res.data.repair_delivery_method[i].code,
            bg: 'white',
            col: 'black',
            selected: false
          }
        )
      }
      const apiDropOffDevices:any = {
        title: 'HOW_WOULD_YOU_LIKE_TO_DROP_YOUR_DEVICE',
        types: repair_types,
      };
      repairWidData.changeApiDropOffDevices(apiDropOffDevices);

      /* repair_contact_method */
      const repair_contact_types:any[] = [];
      for (let i = 0; i < res.data.repair_contact_method.length; i++) {
        repair_contact_types.push(
          {
            name: res.data.repair_contact_method[i].code_text,
            code: res.data.repair_contact_method[i].code,
            bg: 'white',
            col: 'black',
            selected: false
          }
        )
      }
      const receiveQuote:any = {
        title: 'HOW_WOULD_YOU_LIKE_TO_RECEIVE_YOUR_QUOTE',
        types: repair_contact_types,
      };
      repairWidData.changeReceiveQuote(receiveQuote);

    })
    .catch((error) => {
      console.log("Error in get Repair-widget Lookup", error);
    });
}

function getDeliveryMethodsAPI() {
  const store_id: number = storesDetails.store_id;
  const include_disabled: boolean = false;

  repairWidgetAPI
    .getDeliveryMethods(store_id, include_disabled)
    .then((res:any) => {
      console.log('api-repairWidgetAPI => Repair Delivery Method:', res.data);
      repairWidData.changeRepairWidDeliveryMethod(res.data);
    })
    .catch((error) => {
      console.log("Error in get Repair Delivery Method", error);
    });
}

function postAppointmentQuoteAPI(type: string, customerData: any) {
  storesDetails.changeType(type);
  const data:any = {
    "store_id": storesDetails.store_id,
    "location_id": storesDetails.location_id,
    "customer_id": 1,
    "type": type,  /* type is 'QUOTE' or 'APPOINTMENT' */
    "is_voided": storesDetails.is_voided,
    "delivery_method": repairWidgetStore.deliveryMethod.code,
    "customer_email": customerData.email,
    "customer_first_name": customerData.first_name,
    "customer_last_name": customerData.last_name,
    "customer_phone": customerData.phone,
    "customer_address_1": customerData.address_1,
    "customer_address_2": customerData.address_2,
    "customer_city": customerData.city,
    "customer_state": customerData.state,
    "customer_postcode": customerData.postCode,
    "customer_country": customerData.country,
    "customer_note": customerData.note,
    "customer_contact_method": repairWidgetStore.receiveQuote.code,
    "repairs": [
      {
        "repair_id": 1,
        "product_id": 1,
        "cost": 20.00,
        "duration": '30 hours',
        "product_name": 'Apple, iPhone 11',
        "repair_name": 'Screen Replacement'
      }
    ]
  }

  repairWidgetAPI
    .postAppointmentQuote(data)
    .then((res:any) => {
      console.log('api-repairWidgetAPI => Appointment and Quote:', res.data);
    })
    .catch((error) => {
      console.log("Error in post Appointment and Quote", error);
    });
}

async function getDeviceBrandsAPI(searchText:string) {
  const store_id: number = storesDetails.store_id;
  const per_page: number = 10;
  const page: number = 1;
  const is_enabled: boolean = true;

  await repairWidgetAPI
    .getDeviceBrands(store_id, per_page, page, is_enabled, searchText)
    .then(async (res:any) => {
      console.log('api-repairWidgetAPI => Repair Device Brands:', res.data);
      repairWidData.changeRepairDeviceBrands(res.data);
    })
    .catch((error) => {
      console.log("Error in get Repair Device Brands", error);
    });
}

async function getBrandProductsAPI(brand_id:number, searchText:string) {
  const store_id: number = storesDetails.store_id;
  const per_page: number = 10;
  const page: number = 1;
  const included_voided: boolean = true;

  await repairWidgetAPI
    .getBrandProducts(store_id, per_page, page, included_voided, brand_id, searchText)
    .then(async (res:any) => {
      console.log('api-repairWidgetAPI => Repair Brand Products:', res.data);
      repairWidData.changeRepairBrandProducts(res.data);
    })
    .catch((error) => {
      console.log("Error in get Repair Brand Products", error);
    });
}

async function getRepairsOfferedDeviceAPI(product_id:number) {
  const locale: string = window.localStorage.getItem('cntLang') || 'en';
  const store_id: number = storesDetails.store_id;
  const per_page: number = 20;
  const page: number = 1;
  const included_voided: boolean = false;
  const name_sort_order: string = 'asc';
  const is_active: boolean = true;

  await repairWidgetAPI
    .getRepairsOfferedDevice(locale, store_id, per_page, page, included_voided, product_id, name_sort_order, is_active)
    .then(async (res:any) => {
      console.log('api-repairWidgetAPI => Repair Offered Device:', res.data);
      repairWidData.changeRepairsOfferedDevice(res.data);
    })
    .catch((error) => {
      console.log("Error in get Repair Offered Device", error);
    });
}

export {
  getRepairLookupAPI,
  getDeliveryMethodsAPI,
  getRepairsOfferedDeviceAPI,
  postAppointmentQuoteAPI,
  getDeviceBrandsAPI,
  getBrandProductsAPI
}