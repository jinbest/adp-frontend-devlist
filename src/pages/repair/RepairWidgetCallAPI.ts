import { repairWidgetAPI } from '../../services/'
import { repairWidData } from '../../store/'

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

      /* --- dropOffDevice Data on mockData.js should be updated from api like below. ---
        const apiDropOffDevicce:any = {
          title: 'HOW_WOULD_YOU_LIKE_TO_DROP_YOUR_DEVICE',
          types: [      
            { name: 'mail-in', code: 'MI', bg: 'white', col: 'black', selected: false },
            { name: 'pick-up', code: 'PU', bg: 'white', col: 'black', selected: false },
            { name: 'onsite', code: 'ON', bg: 'white', col: 'black', selected: false },
          ],
        };
        repairWidData.changeRepairWidgetLookup(apiDropOffDevicce);
      --------------------------------------------------------------------------------- */

    })
    .catch((error) => {
      console.log("Error in get Repair-widget Lookup", error);
    });
}

function getDeliveryMethodsAPI() {
  const store_id: number = 1;
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

function getRepairsOfferedDeviceAPI() {
  const locale: string = window.localStorage.getItem('cntLang') || 'en';
  const store_id: number = 1;
  const per_page: number = 10;
  const page: number = 1;
  const included_voided: boolean = false;
  const product_id: number = 1;
  const name_sort_order: string = 'asc';
  const is_active: boolean = true;

  repairWidgetAPI
    .getRepairsOfferedDevice(locale, store_id, per_page, page, included_voided, product_id, name_sort_order, is_active)
    .then((res:any) => {
      console.log('api-repairWidgetAPI => Repair Offered Device:', res.data);
    })
    .catch((error) => {
      console.log("Error in get Repair Offered Device", error);
    });
}

function postAppointmentQuoteAPI() {
  const store_id: number = 1;
  const location_id: number = 1;
  const data:any = {
    "store_id": 1,
    "location_id": 1,
    "customer_id": 1,
    "type": 'QUOTE',  /* type is 'QUOTE' or 'APPOINTMENT' */
    "is_voided": false,
    "delivery_method": "ONSITE",
    "customer_email": "e@m.com",
    "customer_first_name": "John",
    "customer_last_name": "eee",
    "customer_phone": "2049554325",
    "customer_address_1": null,
    "customer_address_2": null,
    "customer_city": null,
    "customer_state": null,
    "customer_postcode": null,
    "customer_country": null,
    "customer_note": null,
    "customer_contact_method": "EMAIL",
    "repairs": [
      {
        "repair_id": 1,
        "product_id": 1,
        "cost": 20.00,
        "duration": 30
      }
    ]
  }

  repairWidgetAPI
    .postAppointmentQuote(store_id, location_id, data)
    .then((res:any) => {
      console.log('api-repairWidgetAPI => Appointment and Quote:', res.data);
    })
    .catch((error) => {
      console.log("Error in post Appointment and Quote", error);
    });
}

export {
  getRepairLookupAPI,
  getDeliveryMethodsAPI,
  getRepairsOfferedDeviceAPI,
  postAppointmentQuoteAPI
}