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

// skitter-mobile image
import skitterMobile from "./img/skitter-mobile.png"

const repairWidget = {
  deviceBrand: {
    title: "Choose Your Device Brand",
    placeholder: "Search for your Device Brand",
    mainTopic: {
      title: "Find your device’s brand",
      content: [
        "Your device brand can usually be found on the back of the handset itself, but if for whatever reason you aren’t sure don’t panic!", 
        "It is indicated on back of the device, on the front, or in the Settings/System/About phone section if you are on Android or Settings/ IDs if you are on IOS. It may also be shown on the original box and/or manual that came with your device."
      ],
    },
    disableTopic: {
      title: "How to find the model of your device",
      content: "The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device.",
    },
  },
  deviceModel: {
    title: "Choose Your Device Model",
    placeholder: "Search for your Model",
    mainTopic: {
      title: "How to find the model of your device",
      content: ["The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device."],
    },
    disableTopic: { title: "", content: "" },
  },
  deviceRepairs: {
    title: "Choose Your Issue",
    placeholder: "What’s broken?",
    mainTopic: {
      title: "Service Summary"
    },
  },
  repairAnotherDevice: {
    title: "Add Another Device?",
    mainTopic: {
      title: "Add Another Device?",
      content: "Get all your devices done at once with us!",
    },
  },
  dropOffDevicce: {
    title: "How Would You Like to Get Service?",
  },
  receiveQuote: {
    title: "How Would You Like to Receive Your Quote?",
  },
  contactDetails: {
    title: "Please Enter Your Contact Details",
    placeholder: {
      firstName: "First Name*",
      lastName: "Last Name*",
      emailAdd: "E-mail Address*",
      phoneNum: "Phone Number",
      address1: "Street Address*",
      address2: "Address 2",
      country: "Country",
      city: "City*",
      province: "Province*",
      postalCode: "Postal Code*",
    },
  },
  bookTime: {
    title: {
      MAIL_IN: "Select Mail-In Address",
      PICK_UP: "Schedule a Pick-Up",
      CURBSIDE: "Book Your Time",
      WALK_IN: "Book Your Time",
      ONSITE: "Book Your Time",
    },
    select: {
      location: {
        title: {
          MAIL_IN: "Please Select Preferred Service Location",
          PICK_UP: "Please Enter Your Address",
          CURBSIDE: "Select Preferred Location",
          WALK_IN: "Select Preferred Location",
          ONSITE: "Enter Your Residential Address",
        },
      },
      time: {
        title: {
          MAIL_IN: "Please Enter Your Address for Return Shipment",
          PICK_UP: "Select a Pick-Up Time",
          CURBSIDE: "Select a day and time",
          WALK_IN: "Select a day and time",
          ONSITE: "Select Visit Time",
        },
      },
    },
  },
  usefulInfo: {
    title: "Let us know if there's anything we should know about your device",
    placeholder: "Type your message here (optional)",
  },
  quoteData: [
    {
      img: requestQuote,
      title: "Thank you for choosing",
      text: "with a detailed service quote.",
    },
    {
      img: thankQuote,
      title: "Thank you for choosing",
      text: "with a detailed service quote and appointment information.",
    },
  ],
}

const popularCardData = [
  { img: camera, title: "iPhone 11 Pro", subtitle: "As low as", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "As low as", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "As low as", price: "$897" },
  { img: camera, title: "iPhone 11 Pro", subtitle: "As low as", price: "$897" },
]

const arrowData = {
  arrowLeft: arrowLeft,
  arrowRight: arrowRight,
}

const devicelistData = [
  {
    img: best,
    title: "Competitive Pricing",
    content: "We’re proud to offer the largest selection of fully tested and graded pre-owned devices in Winnipeg. All backed by a one year warranty and lifetime IMEI guarantee",
  },
  {
    img: warranty,
    title: "1 Year Warranty",
    content: "We stand behind all our devices with an iron-clad one year warranty that covers everything except physical or liquid damage.",
  },
  {
    img: amazing,
    title: "Amazing Service",
    content: "Secure shopping experience.",
  },
  {
    img: positive,
    title: "Trade-In Your Device",
    content: "Trade in your existing device - broken or not - for credit towards a repair, product or a newer phone. We buy almost every device, no matter the condition.",
  },
  {
    img: proudly,
    title: "Proudly Canadian",
    content: "Canadian owned and Canadian based.",
  },
]

const footerImageData = {
  buyNow: buyNow,
  deviceList: deviceListImg,
  bell: bell,
  others: [visa, round, amex, interactive, paypal],
}

const locationsData = {
  skitterMobile: skitterMobile
}

export { repairWidget, popularCardData, arrowData, devicelistData, footerImageData, locationsData }