// card-mobile image
import trade from "./img/cardmobile/banana-trade.svg"
import repair from "./img/cardmobile/banana-repair.svg"
import buy from "./img/cardmobile/banana-buy.svg"
import protect from "./img/cardmobile/banana-protect.svg"

// card-fix image
import cellphone from "./img/cardfix/banana-mobile.png"
import tablet from "./img/cardfix/banana-tablet.png"
import computer from "./img/cardfix/banana-computer.png"
import console from "./img/cardfix/banana-game.png"
import other from "./img/cardfix/banana-other.png"

// avatar images
import userActive from "./img/avatar/banana-user-active.png"
import userDeactive from "./img/avatar/banana-user-deactive.png"
import menu from "./img/avatar/banana-menu.png"
import store from "./img/avatar/banana-store.png"
import storeBlue from "./img/avatar/banana-store-blue.png"
import cancel from "./img/avatar/banana-cancel.png"

// shape images
import cornerShape from "./img/banana-corner-shape.svg"
import mockupShape from "./img/banana-mockup-shape.png"

// repair section2 - images
import selectRepair from "./img/repair/section2/banana-select-repair.png"
import sendDevice from "./img/repair/section2/banana-send-device.png"
import receiveDevice from "./img/repair/section2/banana-receive-device.png"

// repair section3 - images
import newImg from "./img/repair/section3/banana-new.png"
import mintImg from "./img/repair/section3/banana-mint.png"
import goodImg from "./img/repair/section3/banana-good.png"
import fairImg from "./img/repair/section3/banana-fair.png"

// logo - images
import logoHeaderImg from "./img/logo/banana-logo-header.png"
import logoFooterImg from "./img/logo/banana-logo-footer.png"

// deviceCard - images
import deviceCardImg from "./img/banana-card.png"

// favicon - image
import favicon from "./img/banana-favicon.ico"

// business - images
import shapeLeftDesktop from "./img/business/banana-shape-left-desktop.png"
import shapeLeftMobile from "./img/business/banana-shape-left-mobile.png"
import businessCornerShape from "./img/business/banana-corner-shape.svg"

const businessData = {
  shapeLeftDesktop: shapeLeftDesktop,
  shapeLeftMobile: shapeLeftMobile,
  businessCornerShape: businessCornerShape
}

const fav = {
  img: favicon,
}

const logoData = {
  logoHeaderImg: logoHeaderImg,
  logoFooterImg: logoFooterImg,
}

const deviceCard = {
  img: deviceCardImg,
}

const cardMobileData = {
  gridMD: 3,
  data: [
    { img: trade, title: "TRADE", btnTitle: "TRADE_IN", flag: "FRONTEND_TRADE", href: "#" },
    {
      img: repair,
      title: "REPAIR",
      btnTitle: "REPAIR",
      flag: "FRONTEND_REPAIR",
      href: "/quote",
    },
    { img: buy, title: "SHOP", btnTitle: "SHOP", flag: "FRONTEND_BUY", href: "#" },
    { img: protect, title: "INSURE", btnTitle: "INSURE", flag: "FRONTEND_INSURE", href: "#" },
  ],
}

const cardFixData = [
  { img: cellphone, title: "CELLPHONE" },
  { img: tablet, title: "TABLET" },
  { img: computer, title: "COMPUTER" },
  { img: console, title: "CONSOLE" },
  { img: other, title: "OTHER" },
]

const contentFixData = [
  {
    title: "FREE_DIAGNOSTICS",
    data: '',
    content: "FREE_DIAGNOSTICS_CONTENT",
  },
  {
    title: "LOW_PRICE_GUARANTEE",
    data: '',
    content: "LOW_PRICE_GUARANTEE_CONTENT",
  },
  {
    title: "QUICK_TURNAROUND",
    data: '',
    content: "QUICK_TURNAROUND_CONTENT",
  },
  {
    title: "DAY_WARRANTY_DYNAMIC",
    data: '90',
    content: "DAY_WARRANTY_DYNAMIC_CONTENT",
  },
]

const colorPalle = {
  orange: "#FEDA00",
  themeColor: "#929292",
  underLineCol: "#54BA71",
  priceCol: "#54BA71",
  repairButtonCol: "#7BBA42",
  nextButtonCol: "#7BBA42",
  repairChooseItemCol: "#A6A7AA",
  repairBooktimeCol: "#7BBA42",
  textThemeCol: "#54BA71",
  heartCol: "#929292",
  chatBgCol: "#929292",
  sec2SvgCol: "#FEDA00",
}

const navItemsData = [
  { href: "#", text: "TRADE", isActive: false, flag: "FRONTEND_TRADE" },
  { href: "/quote", text: "GET_QUOTE", isActive: false, flag: "FRONTEND_REPAIR" },
  { href: "#", text: "SHOP", isActive: false, flag: "FRONTEND_BUY" },
  { href: "#", text: "INSURE", isActive: false, flag: "FRONTEND_INSURE" },
  { href: "/contact", text: "CONTACT", isActive: false, flag: "ALWAYS_TRUE" },
]

const navShop = {
  mainList: [
    {
      type: "Apple",
      list: [
        "iPhone 11 Pro Max",
        "iPhone 11 Pro",
        "iPhone 11",
        "iPhone XS Max",
        "iPhone XS",
        "iPhone XR",
        "iPhone X",
        "iPhone 8 Plus",
        "iPhone 8",
        "iPhone 7 Plus",
        "iPhone 7",
        "iPhone 6s Plus",
        "iPhone 6s",
        "iPhone 6 Plus",
        "iPhone 6",
        "iPhone SE",
        "iPhone 5C",
        "iPhone 5S",
        "iPhone 5",
        "iPhone 4S",
        "iPhone 4",
        "iPhone 3GS",
        "iPhone 3G",
      ],
    },
    {
      type: "Samsung",
      list: [
        "Galaxy S10e",
        "Galaxy S10 Plus",
        "Galaxy S10",
        "Galaxy S10 5G",
        "Galaxy Note 10",
        "Galaxy Note 10 Plus",
        "Galaxy Note 10 Plus G",
        "Galaxy Note 9",
        "Galaxy S9",
        "Galaxy S9 Plus",
        "Galaxy Note 8",
        "Galaxy S8",
        "Galaxy S8 Plus",
        "Galaxy S7",
        "Galaxy S7 Edge",
        "Galaxy Note 5",
        "Galaxy S6 Edge Plus",
        "Galaxy S6",
        "Galaxy S6 Edge",
        "Galaxy Note 4",
        "Galaxy Note Edge",
        "Galaxy S5",
        "Galaxy Note 3",
      ],
    },
    {
      type: "Google",
      list: [
        "Google Pixel 3",
        "Google Pixel 3 XL",
        "Google Pixel 3a",
        "Google Pixel 3a XL",
        "Google Pixel 2",
        "Google Pixel 2 XL",
        "Google Pixel",
        "Google Pixel XL",
      ],
    },
    {
      type: "LG",
      list: ["LG V20", "LG V30", "LG V30 ThinQ", "LG V10", "LG G6", "LG G5"],
    },
    {
      type: "OnePlus",
      list: [
        "OnePlus 7 Pro 5G",
        "OnePlus 7 Pro",
        "OnePlus 7T",
        "OnePlus 6T",
        "OnePlus 6",
        "OnePlus 5T",
        "OnePlus 5",
        "OnePlus 3T",
        "OnePlus 3",
        "OnePlus 2",
        "OnePlus 1",
        "OnePlus X",
      ],
    },
    {
      type: "Essential",
      list: ["Essential PH-1"],
    },
  ],
  otherList: ["SEE_ALL_PRODUCTS", "SEE_HOME", "HOW_TO_SELL"],
}

const brandItemsData = {
  left: [{text: 'BUSINESS', link: '/business'}, {text: 'LOCATIONS', link: '/locations'}],
  brandCol: "white",
  brandThemeCol: "#FEDA00",
  selectOption: ["ENGLISH", "FRENCH"],
}

const hoursData = [
  { day: "MONDAY", time: "9:00 a.m. - 5:00 p.m." },
  { day: "TUESDAY", time: "9:00 a.m. - 5:00 p.m." },
  { day: "WEDNESDAY", time: "9:00 a.m. - 5:00 p.m." },
  { day: "THURSDAY", time: "9:00 a.m. - 5:00 p.m." },
  { day: "FRIDAY", time: "9:00 a.m. - 5:00 p.m." },
  { day: "SATURDAY", time: "11:00 a.m. - 4:00 p.m." },
  { day: "SUNDAY", time: "CLOSED" },
]

const avatarData = {
  userActive: userActive,
  userDeactive: userDeactive,
  cancel: cancel,
  store: { img: store, link: "#" },
  storeBlue: storeBlue,
  menu: menu,
}

const mobileNavItemData = {
  left: [
    { text: "TRADE", href: "#", flag: "FRONTEND_TRADE" },
    { text: "GET_QUOTE", href: "/quote", flag: "FRONTEND_REPAIR" },
    { text: "SHOP", href: "#", flag: "FRONTEND_MEGA_MENU" },
    { text: "INSURE", href: "#", flag: "FRONTEND_INSURE" },
    { text: "BUSINESS", href: "/business", flag: "ALWAYS_TRUE" },
    { text: "LOCATIONS", href: "/locations", flag: "ALWAYS_TRUE" },
    { text: "FINANCING", href: "#", flag: "ALWAYS_TRUE" },
    { text: "INSURANCE", href: "#", flag: "ALWAYS_TRUE" },
    { text: "FIND_A_STORE", href: "#", flag: "FRONTEND_FIND_A_STORE" },
    { text: "CONTACT", href: "/contact", flag: "ALWAYS_TRUE" },
  ],
  right: [
    { text: "Apple", href: "#" },
    { text: "Samsung", href: "#" },
    { text: "Google", href: "#" },
    { text: "LG", href: "#" },
    { text: "OnePlus", href: "#" },
  ],
}

const userNavItemData = [
  { text: "MY_ACCOUNT", href: "#", flag: "FRONTEND_USER_ACCOUNT" },
  { text: "TRACK_REPAIR", href: "/quote", flag: "FRONTEND_REPAIR" },
  { text: "FILE_A_CLAIM", href: "#", flag: "ALWAYS_TRUE" },
  { text: "ORDERS", href: "#", flag: "ALWAYS_TRUE" },
  { text: "TRADE_IN", href: "#", flag: "FRONTEND_TRADE" },
]

const shapeData = {
  cornerShape: { img: cornerShape, width: "" },
  mockupShape: { img: mockupShape, width: "" },
}

const homeTextData = {
  header: {
    buttonTitle: "FIND_A_STORE",
    width: "150px",
  },
  section1: {
    searchPlaceholder: "FIND_YOUR_DEVICE",
    city: "Peterborough",
  },
  section2: {
    title: "WHAT_CAN_WE_FIX_FOR_YOU_TODAY",
  },
  section3: {
    title: "POPULAR_DEVICES",
    subtitle: ["BUY_NOW_PAY_LATER", "WHATEVER_WORKS_FOR_YOU"],
    content: "POPULAR_DEVICES_CONTENT",
    color: "white",
  },
  section4: {
    title: "WELCOME_BANANA",
    btnTitle: "OUR_QUALITY_CHARTER",
  },
  section5: {
    title: "PROTECT_YOUR_DEVICE_WITH_BOUNCE",
    content: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_CONTENT",
    subtitle: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_SUBTITLE",
    subcontent: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_SUBCONTENT",
    subcontentData: ["NO_DEDUCTIBLE", "COVERS_NEW_AND_USED_PHONES"],
    btnTitle: "INSURE_MY_DEVICE",
  },
  section6: {
    title: "SEE_WHY_CUSTOMERS_LOVE_BANANA",
    subtitle: "VIEW_MORE",
    review: [
      {
        score: 5,
        days: "a month ago",
        content:
          "I would highly recommend Banana Service. I went in today with a phone that I thought could possibly be beyond repair. The individual that I spoke with was extremely professional and honest. I was lucky that the damage was not as bad as I had thought, obviously they are the experts! They could have easily kept the phone and charged me what they originally quoted, and I would have never known the difference, but they didn't. I will not hesitate to use them in the future and will definitely recommend them to anyone I come across with a damaged phone.",
        reviewer: "Adrian Moore",
      },
      {
        score: 5,
        days: "a year ago",
        content:
          "I was told it would take 2 weeks for my laptop to be fixed and I got it back in less than one week. They saved all of my data which is most thankful about.",
        reviewer: "Yolanda Haris",
      },
      {
        score: 5,
        days: "4 months ago",
        content:
          "Great local and reliable business. Have done my phone, sons Xbox repair, laptop repair... very cool to have an all-in-one electronic service place for once. I’d give a 10 star if I could.",
        reviewer: "Kent Wiseman",
      },
    ],
  },
  footer: {
    title: { text: "", color: "" },
    gridVal: {
      mainGrid: [4, 8],
      subGrid: [11, 1],
    },
    content: "BANANA_FOOTER_CONTENT_TWO",
    footerLink: [
      {
        name: "RESOURCES",
        lists: [
          { href: "#", text: "CONTACT_US" },
          { href: "#", text: "WARRANTY_AND_RETURNS" },
          { href: "#", text: "SHIPPING" },
          { href: "#", text: "FAQS" },
        ],
      },
      {
        name: "ABOUT",
        lists: [
          { href: "#", text: "WHO_WE_ARE" },
          { href: "#", text: "FINANCING" },
          { href: "#", text: "BLOG" },
          { href: "#", text: "TERMS_OF_SERVICE" },
        ],
      },
      {
        name: "BUSINESS",
        lists: [
          { href: "#", text: "AUTHORIZED_DEALER_PROGRAM" },
          { href: "#", text: "SELL_WITH_US" },
          { href: "#", text: "FIND_A_LOCATION" },
          { href: "#", text: "BUSINESS_SOLUTIONS" },
        ],
      },
      {
        name: "QUALITY",
        lists: [
          { href: "#", text: "DEVICE_GRADING" },
          { href: "#", text: "QUALITY_CONTROL" },
          { href: "#", text: "POINT_QUALITY_CHECK_60" },
          { href: "#", text: "WHAT_IS_PHONECHECK" },
        ],
      },
    ],
  },
}

const repairData = {
  section1: {
    title: "FIX_YOUR_DEVICE_FAST",
    content: "FIX_YOUR_DEVICE_FAST_CONTENT",
    btnTitle: "GET_QUOTE",
    themeCol: "black",
  },
  section2: {
    title: "HOW_DOES_REPAIR_WORK",
    content: [
      {
        img: selectRepair,
        subtitle: "SELECT_A_REPAIR_CATEGORY",
        content: "SELECT_A_REPAIR_CATEGORY_CONTENT",
        type: "SelectRepair",
      },
      {
        img: sendDevice,
        subtitle: "GET_YOUR_DEVICE_TO_US",
        content: "GET_YOUR_DEVICE_TO_US_CONTENT",
        type: "GetDeviceUs",
      },
      {
        img: receiveDevice,
        subtitle: "RECEIVE_YOUR_DEVICE",
        content: "BANANA_RECEIVE_YOUR_DEVICE_CONTENT",
        type: "ReceiveDevice",
      },
    ],
  },
  section3: {
    title: "FROM_NEW_TO_RECONDITIONED",
    content: "BANANA_FROM_NEW_TO_RECONDITIONED_CONTENT",
    children: [
      {
        subtitle: "NEW",
        subcontent: "NEW_CONTENT",
        img: newImg,
      },
      {
        subtitle: "MINT",
        subcontent: "MINT_CONTENT",
        img: mintImg,
      },
      {
        subtitle: "GOOD",
        subcontent: "GOOD_CONTENT",
        img: goodImg,
      },
      {
        subtitle: "FAIR",
        subcontent: "FAIR_CONTENT",
        img: fairImg,
      },
    ],
  },
  section4: {
    title: "GET_THE_LATEST",
    content: "SHOP_SELECTION_OF_NEW_AND_PREOWNED_DEVICE",
    btnTitle: "FIND_A_STORE",
    themeCol: "black",
    link: "#"
  },
}

const getTabData = (companyName) => {
  return {
    title: `Cell Phone, iPhone & iPad Repair Peterborough | ${companyName ? companyName : ""}`,
    metaDescription: `Same day repair of your broken, cracked, smashed or water damaged iPhone, iPad or cell phone in Peterborough. Call ${
      companyName ? companyName : ""
    } or book your repair online today!`,
    headTag: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WQGQLXB');                                    
        `,
    bodyTag: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQGQLXB"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>                        
        `,
  }
}

export {
  cardMobileData,
  colorPalle,
  cardFixData,
  contentFixData,
  navItemsData,
  brandItemsData,
  hoursData,
  avatarData,
  mobileNavItemData,
  userNavItemData,
  shapeData,
  homeTextData,
  repairData,
  logoData,
  deviceCard,
  navShop,
  fav,
  getTabData,
  businessData
}
