import { GetCurrentLocParams } from "../model/get-current-location"
import { useLocation } from "react-router-dom"
import { GetQuotesParams } from "../model/get-quote-params"
import { repairWidgetStore, storesDetails } from "../store"
import { repairWidgetAPI } from "./"

interface LocationHour {
  close: string
  created_by: string
  created_date: string
  day: number
  deleted_by: string | null
  deleted_date: string | null
  id: number
  is_voided: boolean
  location_id: number
  modified_by: string | null
  modified_date: string | null
  open: string
  store_id: boolean
  type: "REGULAR" | "HOLIDAY"
  by_appointment_only: boolean
}

export function getRegularHours(hours: any[]) {
  return hours
    .map((v) => v as LocationHour)
    .filter((p) => {
      return p.type == "REGULAR"
    })
    .sort((d) => d.day)
}

export function RevertTimeTZ(time: string, timezone: string | undefined) {
  if (!time) return null
  const tz = ConvertTZToNum(timezone),
    cntTzOfset = -(new Date().getTimezoneOffset() / 60)
  const stamp = (
      Number(time.split(":")[0]) + (tz - cntTzOfset) > 0 ? 
        Number(time.split(":")[0]) + (tz - cntTzOfset) : 
        Number(time.split(":")[0]) + (tz - cntTzOfset + 24)
    ) * 60 + Number(time.split(":")[1])
  const hour = Math.floor(stamp/60), min = stamp % 60 > 9 ? (stamp % 60).toString() : "0" + stamp % 60
  return hour + ":" + min
}

export function getHourType(hourStr: string, timezone: string) {
  if (!hourStr) return "12:00 a.m"
  const tz = ConvertTZToNum(timezone),
    cntTzOfset = -(new Date().getTimezoneOffset() / 60)
  const ptr = hourStr.split(":")
  let hour = 12, minute = "00", stamp = 0
  let AP = "a.m."
  stamp = (Number(ptr[0]) + (cntTzOfset-tz)) * 60 + Number(ptr[1])
  hour = Math.floor(stamp / 60)
  if (hour >= 36) {
    AP = "p.m."
  } else if (hour >= 24) {
    AP = "a.m."
  } else if (hour >= 12) {
    AP = "p.m."
  } else {
    AP = "a.m."
  }
  minute = stamp % 60 > 9 ? (stamp % 60).toString() : "0" + stamp % 60
  return `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${AP}`
}

export function getAddress(location: any) {
  if (!location) return ""
  return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
    location.city ? location.city + ", " : ""
  } ${location.state ? location.state + " " : ""} ${
    location.postcode
      ? location.postcode.substring(0, 3) +
        " " +
        location.postcode.substring(3, location.postcode.length)
      : ""
  }`
}

export function ConvertTZToNum(val: string | undefined) {
  if (!val) return 0
  const prev = val[0],
    ptrs = val.substring(1).split(":")
  let result = 0
  if (prev === "-") {
    result = -(Number(ptrs[0]) + Number(ptrs[1]) / 60)
  } else {
    result = -(Number(ptrs[0]) + Number(ptrs[1]) / 60)
  }
  return result
}

export function makeLocations(data: any[]) {
  const locations: GetCurrentLocParams[] = []
  const days: any[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  for (let i = 0; i < data.length; i++) {
    const hours: any[] = [],
      weekDays: any[] = [],
      storeGroup: any[] = []
    for (let j = 0; j < data[i].location_hours.length; j++) {
      if (data[i].location_hours[j].type === "REGULAR") {
        const cntStoreID = data[i].location_hours[j].store_id
        if (!storeGroup.includes(cntStoreID)) {
          storeGroup.push(cntStoreID)
          hours.push({ store_id: cntStoreID, hrs: [] })
          weekDays.push({ store_id: cntStoreID, wkDys: [] })
        }
        let hour = ""
        if (!data[i].location_hours[j].open || !data[i].location_hours[j].close) {
          hour = "Closed"
        } else {
          const open = getHourType(data[i].location_hours[j].open, data[i].timezone), 
            close = getHourType(data[i].location_hours[j].close, data[i].timezone)
          hour = open + " - " + close
        }
        for (let k = 0; k < hours.length; k++) {
          if (cntStoreID === hours[k].store_id) {
            hours[k].hrs.push(hour)
            weekDays[k].wkDys.push(days[data[i].location_hours[j].day])
            break
          }
        }
      }
    }
    const cntItem: GetCurrentLocParams = {
      location_name: data[i].location_name,
      address_1: data[i].address_1,
      address_2: data[i].address_2,
      distance: data[i].distance ? (data[i].distance / 1000).toFixed(1) + "km" : "",
      location_id: data[i].id,
      hours: hours,
      days: weekDays,
      latitude: data[i].latitude,
      longitude: data[i].longitude,
      business_page_link: data[i].business_page_link,
      timezone: data[i].timezone
    }
    locations.push(cntItem)
  }
  return locations
}

export function availableTimeRange(min: number, max: number, intv: number, mut: number) {
  if (min === max) return ["Closed"]
  const timeRange: any[] = []
  let cntMin = min
  while (1) {
    timeRange.push(cntMin * mut)
    cntMin = cntMin + intv
    if (cntMin > max) {
      break
    }
  }
  return timeRange
}

export function isWeek(selyear: number, selmonth: number, selday: number) {
  return new Date(selyear, selmonth, selday).getDay()
}

export function isPast(
  selyear: number,
  selmonth: number,
  selday: number,
  seloff: number,
  hrs: number,
  mins: number
) {
  const timeoffset = -new Date().getTimezoneOffset() / 60
  const selectedTiemStamp = new Date(
    selyear,
    selmonth,
    selday,
    hrs + (timeoffset - seloff),
    mins
  ).getTime()
  const standTimeStamp = new Date().getTime()
  return selectedTiemStamp < standTimeStamp
}

export function convertStrToStamp(val: string, open: boolean) {
  if (!val) return 0
  const AP = val.split(" ")[1],
    hr = Number(val.split(" ")[0].split(":")[0]),
    min = Number(val.split(" ")[0].split(":")[1])
  if (AP === "a.m.") {
    if (!open) {
      if (hr !== 12) return (hr + 24) * 60 + min
      return (hr + 12) * 60 + min
    }
    return hr * 60 + min
  } else {
    if (hr === 12) return hr * 60 + min
    return (hr + 12) * 60 + min
  }
}

export function convertTimeRange(hoursRange: any[]) {
  const timesRange = []
  for (let i = 0; i < hoursRange.length; i++) {
    if (parseInt(hoursRange[i].split("-")[0])) {
      const startTime = convertStrToStamp(hoursRange[i].split(" - ")[0], true)
      let endTime = 0
      if (hoursRange[i].split(" - ")[0].split(" ")[1] === "a.m.") {
        endTime = convertStrToStamp(hoursRange[i].split(" - ")[1], true)
      } else {
        endTime = convertStrToStamp(hoursRange[i].split(" - ")[1], false)
      }
      timesRange.push([startTime, endTime])
    } else {
      timesRange.push([0, 0])
    }
  }
  return timesRange
}

export function phoneFormatString(phnumber: string) {
  let formatPhnumber: string = phnumber,
    countrycode = "",
    Areacode = "",
    number = ""
  if (phnumber.length <= 10 && phnumber.length > 6) {
    countrycode = phnumber.substring(0, 3)
    Areacode = phnumber.substring(3, 6)
    number = phnumber.substring(6, phnumber.length)
    formatPhnumber = "(" + countrycode + ") " + Areacode + "-" + number
  } else if (phnumber.length > 10) {
    countrycode = phnumber.substring(phnumber.length - 10, phnumber.length - 7)
    Areacode = phnumber.substring(phnumber.length - 7, phnumber.length - 4)
    number = phnumber.substring(phnumber.length - 4, phnumber.length)
    formatPhnumber =
      phnumber.substring(0, phnumber.length - 10) +
      " (" +
      countrycode +
      ") " +
      Areacode +
      "-" +
      number
  }
  return formatPhnumber
}

export function checkDomain(url: string) {
  if (url.indexOf("//") === 0) {
    url = location.protocol + url
  }
  return url
    .toLowerCase()
    .replace(/([a-z])?:\/\//, "$1")
    .split("/")[0]
}

export function isExternal(url: string) {
  return (
    (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
    checkDomain(location.href) !== checkDomain(url)
  )
}

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export async function setQuotesStore(data: GetQuotesParams) {
  const prodsID: number[] = []
  for (let i = 0; i < data.repairs.length; i++) {
    prodsID.push(data.repairs[i].product_id)
  }
  const uniqueProdsID = prodsID.filter((c, index) => {
    return prodsID.indexOf(c) === index;
  });
  await repairWidgetAPI
    .getBrandsProducts(data.store_id, uniqueProdsID)
    .then(async (res: any) => {
      setRepairWidgetStore(res.data.data, data)
    })
    .catch((error) => {
      console.log("Error in get Brands and Products", error)
    })
}

function setRepairWidgetStore(res: any[], data: GetQuotesParams) {
  // console.log("Brands & Products\n", res, data)
  const deviceBrand = [], deviceModel = [], chooseRepair = []
  for (let i = 0; i < res.length; i++) {
    deviceBrand.push({
      alt: res[i].brand.img_alt,
      id: res[i].brand.id,
      img: res[i].brand.img_src,
      name: res[i].brand.name
    })
    deviceModel.push({
      alt: res[i].img_alt,
      id: res[i].id,
      img: res[i].img_src,
      name: res[i].name
    })
    const chooseRepairItem = []
    for (let j = 0; j < data.repairs.length; j++) {
      if (data.repairs[j].product_id === res[i].id) {
        chooseRepairItem.push({
          estimate: data.repairs[j].duration,
          id: data.repairs[j].repair_id,
          name: data.repairs[j].repair_name,
          warranty: data.repairs[j].warranty,
          warranty_unit: data.repairs[j].warranty_unit,
        })
      }
    }
    chooseRepair.push(chooseRepairItem)
  }
  repairWidgetStore.changeDeviceBrand(deviceBrand)
  repairWidgetStore.changeDeviceModel(deviceModel)
  repairWidgetStore.changeChooseRepair(chooseRepair)
  repairWidgetStore.changeDeviceCounter(res.length)
  repairWidgetStore.changeCntStep(7)
  repairWidgetStore.changeReceiveQuote({
    method: data.customer_contact_method, 
    code: data.customer_contact_method
  })
  repairWidgetStore.changeDeliveryMethod({
    method: data.delivery_method, 
    code: data.delivery_method
  })
  repairWidgetStore.changeContactDetails({
    firstName: data.customer_first_name, 
    lastName: data.customer_last_name, 
    email: data.customer_email, 
    phone: data.customer_phone,
    address1: { code: '', name: data.customer_address_1 },
    address2: { code: '', name: data.customer_address_2 },
    country: { code: '', name: data.customer_country },
    city: data.customer_city,
    postalCode: data.customer_postcode
  })
  storesDetails.changeFindAddLocation(storesDetails.allLocations)
  for (let i = 0; i < storesDetails.allLocations.length; i++) {
    if (Number(storesDetails.allLocations[i].id) === Number(data.location_id)) {
      storesDetails.changeCntUserLocation(makeLocations([storesDetails.allLocations[i]]))
      storesDetails.changeLocationID(data.location_id)
      storesDetails.changeCustomerID(data.customer_id)
      storesDetails.changeCntUserLocationSelected(true)
      break;
    }
  }
}