// repair-quote-data
import requestQuote from "./service-widget/quote/requestQuote.png"
import thankQuote from "./service-widget/quote/thankQuote.png"

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

export { repairWidget }
