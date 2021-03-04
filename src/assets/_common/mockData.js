// repair-quote-data
import requestQuote from "./img/quote/requestQuote.png"
import thankQuote from "./img/quote/thankQuote.png"

// card-popular image
import camera from "./img/popular/camera.png"

// arrow images
import arrowLeft from "./img/arrow/arrow-left.png"
import arrowRight from "./img/arrow/arrow-right.png"

// device-list images
import best from "./img/devicelist/best.png"
import warranty from "./img/devicelist/warranty.png"
import positive from "./img/devicelist/positive.png"
import amazing from "./img/devicelist/amazing.png"
import proudly from "./img/devicelist/proudly.png"

// online-payment images
import buyNow from "./img/online-payment/buy-now.png"
import visa from "./img/online-payment/visa.png"
import round from "./img/online-payment/round.png"
import amex from "./img/online-payment/amex.png"
import interactive from "./img/online-payment/interactive.png"
import paypal from "./img/online-payment/paypal.png"
import deviceListImg from "./img/online-payment/device-list.png"
import bell from "./img/online-payment/bell.png"

const repairWidget = {
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
  },
  deviceModel: {
    title: "CHOOSE_YOUR_DEVICE_MODEL_APPLE",
    placeholder: "SEARCH_FOR_YOUR_MODEL",
    mainTopic: {
      title: "HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE",
      content: ["HOW_TO_FIND_THE_MODEL_OF_YOUR_DEVICE_CONTENT"],
    },
    disableTopic: { title: "", content: "" },
  },
  deviceRepairs: {
    title: "CHOOSE_YOUR_REPAIRS",
    placeholder: "WHAT_IS_BROKEN",
    mainTopic: {
      title: "REPAIR_SERVICE_SUMMARY",
      content: [],
    },
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
  },
  receiveQuote: {
    title: "HOW_WOULD_YOU_LIKE_TO_RECEIVE_YOUR_QUOTE",
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
      },
      time: {
        title: {
          MAIL_IN: "PLEASE_ENTER_YOUR_ADDRESS_FOR_RETURN_SHIPMENT",
          PICK_UP: "SELECT_A_PICK_UP_TIME",
          CURBSIDE: "SELECT_CURBSIDE_DROP_OFF_TIME",
          WALK_IN: "SELECT_CURBSIDE_DROP_OFF_TIME",
          ONSITE: "SELECT_VISIT_TIME",
        },
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

const popularCardData = [
  { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
]

const arrowData = {
  arrowLeft: arrowLeft,
  arrowRight: arrowRight,
}

const devicelistData = [
  {
    img: best,
    title: "BEST_OFFER_AVAILABLE",
    content: "BEST_OFFER_AVAILABLE_CONTENT",
  },
  {
    img: warranty,
    title: "YEAR_1_WARRANTY",
    content: "YEAR_1_WARRANTY_CONTENT",
  },
  {
    img: amazing,
    title: "AMAZING_SERVICE",
    content: "AMAZING_SERVICE_CONTENT",
  },
  {
    img: positive,
    title: "POSITIVE_IMPACT",
    content: "POSITIVE_IMPACT_CONTENT",
  },
  {
    img: proudly,
    title: "PROUDLY_CANADIAN",
    content: "PROUDLY_CANADIAN_CONTENT",
  },
]

const footerImageData = {
  buyNow: buyNow,
  deviceList: deviceListImg,
  bell: bell,
  others: [visa, round, amex, interactive, paypal],
}

export { repairWidget, popularCardData, arrowData, devicelistData, footerImageData }