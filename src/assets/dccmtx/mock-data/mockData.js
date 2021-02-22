// repair-device-brand images
import apple from "./service-widget/device-brand/apple.png"
import asus from "./service-widget/device-brand/asus.png"
import blackberry from "./service-widget/device-brand/blackberry.png"
import google from "./service-widget/device-brand/google.png"
import lg from "./service-widget/device-brand/lg.png"
import motorola from "./service-widget/device-brand/motorola.png"
import oneplus from "./service-widget/device-brand/oneplus.png"
import other from "./service-widget/device-brand/other.png"
import samsung from "./service-widget/device-brand/samsung.png"
import sony from "./service-widget/device-brand/sony.png"
import xiaomi from "./service-widget/device-brand/xiaomi.png"

// repair-device-model
import iPhoneHalf from "./service-widget/device-model/iPhone-half.png"
// import iPhoneWhole from './service-widget/device-model/iPhone-whole.png'

// repair-quote-data
import requestQuote from "./service-widget/quote/requestQuote.png"
import thankQuote from "./service-widget/quote/thankQuote.png"

const repairWidget = {
  publicText: {
    next: "NEXT",
    enterKey: "ENTER_KEY",
    yes: "YES",
    no: "NO",
    repairSummary: "REPAIR_SUMMARY",
    repairService: "REPAIR_SERVICE",
    repairServiceSummary: "REPAIR_SERVICE_SUMMARY",
    yourInfo: "YOUR_INFO",
    deliveryMethod: "DELIVERY_METHOD",
    preferredContactMethod: "PREFERRED_CONTACT_METHOD",
    message: "MESSAGE",
    device: "DEVICE",
    scheduleAppointment: "SCHEDULE_APPOINTMENT",
    requestQuote: "REQUEST_QUOTE",
  },
  deviceBrand: {
    title: "CHOOSE_YOUR_DEVICE_BRAND",
    placeholder: "SEARCH_FOR_YOUR_DEVICE_BRAND",
    mainTopic: {
      title: "FIND_YOUR_DEVICE_BRAND",
      content: ["FIND_YOUR_DEVICE_BRAND_CONTENT_1", "FIND_YOUR_DEVICE_BRAND_CONTENT_2"],
    },
    disableTopic: {
      title: "HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE",
      content: "HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE_CONTENT",
    },
    images: [
      { name: "Apple", img: apple },
      { name: "Samsung", img: samsung },
      { name: "Google", img: google },
      { name: "Lg", img: lg },
      { name: "Motorola", img: motorola },
      { name: "Asus", img: asus },
      { name: "Sony", img: sony },
      { name: "Oneplus", img: oneplus },
      { name: "Blackberry", img: blackberry },
      { name: "Xiaomi", img: xiaomi },
      { name: "Other", img: other },
    ],
  },
  deviceModel: {
    title: "CHOOSE_YOUR_DEVICE_MODEL_APPLE",
    placeholder: "SEARCH_FOR_YOUR_MODEL",
    mainTopic: {
      title: "HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE",
      content: ["HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE_CONTENT"],
    },
    disableTopic: { title: "", content: "" },
    images: [
      { name: "iPhone 11 Pro Max", img: iPhoneHalf },
      { name: "iPhone 11 Pro", img: iPhoneHalf },
      { name: "iPhone 11", img: iPhoneHalf },
      { name: "iPhone XS Max", img: iPhoneHalf },
      { name: "iPhone XS", img: iPhoneHalf },
      { name: "iPhone XR", img: iPhoneHalf },
      { name: "iPhone X", img: iPhoneHalf },
      { name: "iPhone SE 2020", img: iPhoneHalf },
      { name: "iPhone 8 Plus", img: iPhoneHalf },
      { name: "iPhone 8", img: iPhoneHalf },
      { name: "iPhone 7 Plus", img: iPhoneHalf },
      { name: "iPhone 7", img: iPhoneHalf },
      { name: "iPhone 6S Plus", img: iPhoneHalf },
      { name: "iPhone 6 Plus", img: iPhoneHalf },
    ],
  },
  deviceRepairs: {
    title: "CHOOSE_YOUR_REPAIRS",
    placeholder: "WHAT_IS_BROKEN",
    mainTopic: {
      title: "REPAIR_SERVICE_SUMMARY",
      content: [],
    },
    types: [
      { name: "BACK_GLASS", bg: "white", col: "black", estimate: "35 minutes", selected: false },
      { name: "BATTERY", bg: "white", col: "black", estimate: "60 minutes", selected: false },
      { name: "CAMERA_FRONT", bg: "white", col: "black", estimate: "135 minutes", selected: false },
      { name: "CAMERA_BACK", bg: "white", col: "black", estimate: "155 minutes", selected: false },
      {
        name: "CHARGING_PORT",
        bg: "white",
        col: "black",
        estimate: "275 minutes",
        selected: false,
      },
      { name: "SCREEN", bg: "white", col: "black", estimate: "55 minutes", selected: false },
    ],
  },
  repairAnotherDevice: {
    title: "REPAIR_ANOTHER_DEVICE",
    mainTopic: {
      title: "REPAIR_ANOTHER_DEVICE",
      content: "REPAIR_ANOTHER_DEVICE_CONTENT",
    },
  },
  dropOffDevicce: {
    title: "HOW_WOULD_YOU_LIKE_TO_DROP_YOUR_DEVICE",
    types: [
      { name: "MAIL_IN", code: "MAIL_IN", bg: "white", col: "black", selected: false },
      {
        name: "PICK_UP_DROP_OFF_SERVICE",
        code: "PICK_UP",
        bg: "white",
        col: "black",
        selected: false,
      },
      { name: "CURBSIDE_DROP_OFF", code: "CURBSIDE", bg: "white", col: "black", selected: false },
      { name: "OUTSIDE_REPAIR", code: "ONSITE", bg: "white", col: "black", selected: false },
    ],
  },
  receiveQuote: {
    title: "HOW_WOULD_YOU_LIKE_TO_RECEIVE_YOUR_QUOTE",
    types: [
      { name: "EMAIL", code: "EMAIL", bg: "white", col: "black", selected: false },
      { name: "TEXT", code: "TEXT", bg: "white", col: "black", selected: false },
      { name: "PHONE_CALL", code: "PHONE", bg: "white", col: "black", selected: false },
    ],
  },
  contactDetails: {
    title: "PLEASE_ENTER_YOUR_CONTACT_DETAILS",
    placeholder: {
      firstName: "FIRST_NAME",
      lastName: "LAST_NAME",
      emailAdd: "EMAIL_ADDRESS",
      phoneNum: "PHONE_NUM",
      address1: "STREET_ADDRESS",
      address2: "ADDRESS_2",
      country: "COUNTRY",
      city: "CITY",
      province: "PROVINCE",
      postalCode: "POSTAL_CODE",
    },
  },
  bookTime: {
    title: {
      MAIL_IN: "SELECT_MAIN_IN_ADDRESS",
      PICK_UP: "SCHEDULE_A_PICK_UP",
      CURBSIDE: "BOOK_YOUR_TIME",
      WALK_IN: "BOOK_YOUR_TIME",
      ONSITE: "BOOK_YOUR_TIME",
    },
    select: {
      location: {
        title: {
          MAIL_IN: "PLEASE_SELECT_PREFERRED_SERVICE_LOCATION",
          PICK_UP: "PLEASE_ENTER_YOUR_ADDRESS",
          CURBSIDE: "SELECT_PREFERRED_LOCATION",
          WALK_IN: "SELECT_PREFERRED_LOCATION",
          ONSITE: "ENTER_YOUR_RESIDENTIAL_ADDRESS",
        },
        option: [
          { name: "111 Mailing Street, lqaluit NU", code: "ML" },
          { name: "555 Street, Canada", code: "SC" },
        ],
        mailInOption: [
          { name: "4160 Mailing Street, lqaluit NU", checked: true },
          { name: "111 Mailing Street, lqaluit NU", checked: false },
        ],
      },
      time: {
        title: {
          MAIL_IN: "PLEASE_ENTER_YOUR_ADDRESS_FOR_RETURN_SHIPMENT",
          PICK_UP: "SELECT_A_PICK_UP_TIME",
          CURBSIDE: "SELECT_CURBSIDE_DROP_OFF_TIME",
          WALK_IN: "SELECT_CURBSIDE_DROP_OFF_TIME",
          ONSITE: "SELECT_VISIT_TIME",
        },
        workingHours: [
          ["MONDAY_FRIDAY", "9:00 a.m.-5:00 p.m."],
          ["SATURDAY", "11:00 a.m.-4:00 p.m."],
          ["SUNDAY", "CLOSED"],
        ],
      },
    },
  },
  usefulInfo: {
    title: "ENTER_A_MESSAGE_OR_USEFUL_INFO",
    placeholder: "TYPE_YOUR_MESSAGE_HERE_OPTIONAL",
  },
  quoteData: [
    {
      img: requestQuote,
      title: "THANK_YOU_FOR_CHOOSING_DEVICELIST_FOR_YOUR_REPAIR",
      text: "WITH_A_DETAILED_SERVICE_QUOTE",
    },
    {
      img: thankQuote,
      title: "THANK_YOU_FOR_CHOOSING_DEVICELIST_FOR_YOUR_REPAIR",
      text: "WITH_A_DETAILED_SERVICE_QUOTE_AND_APPOINTMENT",
    },
  ],
}

export { repairWidget }
