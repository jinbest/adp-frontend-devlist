// card-mobile image
import trade from "./img/cardmobile/northtech-trade.svg"
import repair from "./img/cardmobile/northtech-repair.svg"
import buy from "./img/cardmobile/northtech-buy.svg"
import protect from "./img/cardmobile/northtech-protect.svg"

// card-fix image
import cellphone from "./img/cardfix/northtech-mobile.png"
import tablet from "./img/cardfix/northtech-tablet.png"
import computer from "./img/cardfix/northtech-computer.png"
import console from "./img/cardfix/northtech-game.png"
import other from "./img/cardfix/northtech-other.png"

// avatar images
import userActive from "./img/avatar/northtech-user-active.png"
import userDeactive from "./img/avatar/northtech-user-deactive.png"
import menu from "./img/avatar/northtech-menu.png"
import store from "./img/avatar/northtech-store.png"
import storeBlue from "./img/avatar/northtech-store-blue.png"
import cancel from "./img/avatar/northtech-cancel.png"

// shape images
import cornerShape from "./img/northtech-shape-home.png"

// repair section2 - images
import selectRepair from "./img/repair/section2/northtech-select-repair.png"
import sendDevice from "./img/repair/section2/northtech-send-device.png"
import receiveDevice from "./img/repair/section2/northtech-receive-device.png"

// repair section3 - images
import newImg from "./img/repair/section3/northtech-new.png"
import mintImg from "./img/repair/section3/northtech-mint.png"
import goodImg from "./img/repair/section3/northtech-good.png"
import fairImg from "./img/repair/section3/northtech-fair.png"

// logo - images
import logoHeaderImg from "./img/logo/northtech-logo-header.png"
import logoFooterImg from "./img/logo/northtech-logo-footer.png"

// deviceCard - images
import deviceCardImg from "./img/northtech-device-card.svg"

// favicon - image
import favicon from "./img/northtech-favicon.ico"

// business - images
import shapeLeftDesktop from "./img/business/northtech-shape-left-desktop.png"
import shapeLeftMobile from "./img/business/northtech-shape-left-mobile.png"
import businessCornerShape from "./img/business/northtech-corner-shape.png"

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
    {
      img: buy,
      title: "SHOP",
      btnTitle: "SHOP",
      flag: "FRONTEND_BUY",
      href: "http://northtechshop.ca/",
    },
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
    content:
      "LOW_PRICE_GUARANTEE_CONTENT",
  },
  {
    title: "QUICK_TURNAROUND",
    data: '',
    content: "QUICK_TURNAROUND_CONTENT",
  },
  {
    title: "MONTH_6_WARRANTY",
    data: '6',
    content: "MONTH_6_WARRANTY_CONTENT",
  },
]

const colorPalle = {
  orange: "#F67500",
  themeColor: "#2B388F",
  underLineCol: "#2B388F",
  priceCol: "#F67500",
  repairButtonCol: "#2B388F",
  nextButtonCol: "#2B388F",
  repairChooseItemCol: "#2B388F",
  repairBooktimeCol: "#2B388F",
  textThemeCol: "#2B388F",
  heartCol: "#2B388F",
  chatBgCol: "#2B388F",
  sec2SvgCol: "#F67500",
}

const navItemsData = [
  { href: "#", text: "TRADE", isActive: false, flag: "FRONTEND_TRADE" },
  { href: "/quote", text: "GET_QUOTE", isActive: false, flag: "FRONTEND_REPAIR" },
  { href: "http://northtechshop.ca/", text: "SHOP", isActive: false, flag: "FRONTEND_BUY" },
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
  left: [{text: 'BUSINESS', link: '/business'}, {text: 'FINANCING', link: '#'}],
  brandCol: "white",
  brandThemeCol: "#F67500",
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
  store: { img: store, link: "http://northtechshop.ca/" },
  storeBlue: storeBlue,
  menu: menu,
}

const mobileNavItemData = {
  left: [
    { text: "TRADE", href: "#", flag: "FRONTEND_TRADE" },
    { text: "GET_QUOTE", href: "/quote", flag: "FRONTEND_REPAIR" },
    { text: "SHOP", href: "http://northtechshop.ca/", flag: "FRONTEND_BUY" },
    { text: "INSURE", href: "#", flag: "FRONTEND_INSURE" },
    { text: "BUSINESS", href: "/business", flag: "ALWAYS_TRUE" },
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
  { text: "TRACKING", href: "#", flag: "ALWAYS_TRUE" },
  { text: "ORDERS", href: "#", flag: "ALWAYS_TRUE" },
  { text: "TRADE_IN", href: "#", flag: "FRONTEND_TRADE" },
]

const shapeData = {
  cornerShape: { img: cornerShape, width: "100%" },
  mockupShape: "",
}

const homeTextData = {
  header: {
    buttonTitle: "FIND_A_STORE",
    width: "150px",
  },
  section1: {
    searchPlaceholder: "FIND_YOUR_DEVICE",
    city: "Nunavut",
  },
  section2: {
    title: "WHAT_CAN_WE_FIX_FOR_YOU_TODAY",
  },
  section3: {
    title: "POPULAR_DEVICES",
    subtitle: ["BUY_NOW_PAY_LATER", "WHATEVER_WORKS_FOR_YOU"],
    content: "POPULAR_DEVICES_CONTENT",
    color: "black",
  },
  section4: {
    title: "WELCOME_NORTHTECH",
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
    title: "SEE_WHY_CUSTOMERS_LOVE_NORTHTECH",
    subtitle: "VIEW_MORE",
    review: [
      {
        score: 5,
        days: "2 months ago",
        content:
          "Best customer service. NorthTech will respond to your inquiries ASAP. They're more than helpful for your electronic needs & will have your orders ready upon arrival if requested. NorthTech also provides free delivery in Iqaluit NU or free shipping to communities in Nunavut!",
        reviewer: "Niomie Kownirk",
      },
      {
        score: 5,
        days: "8 months ago",
        content:
          "Great customer service. Fast and friendly. My mom bought a phone off them a week ago and she dropped it, but these guys gave her a deal she couldn't refuse. I highly recommend them. Nakurmiik NorthTech!",
        reviewer: "Martha Lawlor",
      },
      {
        score: 5,
        days: "10 months ago",
        content:
          "Dealing with this company has been a pleasant experience. They are quick to respond, go above and beyond to find you what you want, and offer quality products at an affordable price. I got an iPhone 11 Pro in Nov 2019 and so far, have zero complaints! I also got a MacBook Pro last month and I must say I am also very pleased! NorthTech also offers great warranties to help reassure you when making your purchase. Definitely recommend.",
        reviewer: "Sandra Lanois-Bazinet",
      },
    ],
  },
  footer: {
    title: { text: "GIVING_BACK_TO_NORTH", color: "white" },
    gridVal: {
      mainGrid: [4, 8],
      subGrid: [11, 1],
    },
    content: "NORTHTECH_FOOTER_CONTENT_TWO",
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
        content: "NORTHTECH_RECEIVE_YOUR_DEVICE_CONTENT",
        type: "ReceiveDevice",
      },
    ],
  },
  section3: {
    title: "FROM_NEW_TO_RECONDITIONED",
    content: "NORTHTECH_FROM_NEW_TO_RECONDITIONED_CONTENT",
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
    btnTitle: "SHOP_NOW",
    themeCol: "black",
    link: "http://northtechshop.ca/"
  },
}

const getTabData = (companyName) => {
  return {
    title: `Cell Phone, iPhone & iPad Repair Iqaluit | ${companyName ? companyName : ""}`,
    metaDescription: `Same day repair of your broken, cracked, smashed or water damaged iPhone, iPad or cell phone in Iqaluit. Call ${
      companyName ? companyName : ""
    } or book your repair online today!`,
    headTag: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NNZV9HL');        
        `,
    bodyTag: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNZV9HL"
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
