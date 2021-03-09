// card-mobile image
import trade from "./img/cardmobile/mobiletech-trade.png"
import repair from "./img/cardmobile/mobiletech-repair.png"
import buy from "./img/cardmobile/mobiletech-buy.png"
import protect from "./img/cardmobile/mobiletech-protect.png"

// card-fix image
import cellphone from "./img/cardfix/mobiletech-mobile.png"
import tablet from "./img/cardfix/mobiletech-tablet.png"
import computer from "./img/cardfix/mobiletech-computer.png"
import console from "./img/cardfix/mobiletech-game.png"
import other from "./img/cardfix/mobiletech-other.png"

// avatar images
import userActive from "./img/avatar/mobiletech-user-active.png"
import userDeactive from "./img/avatar/mobiletech-user-deactive.png"
import menu from "./img/avatar/mobiletech-menu.png"
import store from "./img/avatar/mobiletech-store.png"
import storeBlue from "./img/avatar/mobiletech-store-blue.png"
import cancel from "./img/avatar/mobiletech-cancel.png"

// shape images
import backMTLImg from "./img/MTLwinnipeg.jpeg"

// repair section2 - images
import selectRepair from "./img/repair/section2/mobiletech-select-repair.png"
import sendDevice from "./img/repair/section2/mobiletech-send-device.png"
import receiveDevice from "./img/repair/section2/mobiletech-receive-device.png"

// repair section3 - images
import newImg from "./img/repair/section3/mobiletech-new.png"
import mintImg from "./img/repair/section3/mobiletech-mint.png"
import goodImg from "./img/repair/section3/mobiletech-good.png"
import fairImg from "./img/repair/section3/mobiletech-fair.png"

// logo - images
import logoHeaderImg from "./img/logo/mobiletech-logo-header.png"
import logoFooterImg from "./img/logo/mobiletech-logo-footer.png"

// deviceCard - images
import deviceCardImg from "./img/mobiletech-device-card.png"

// favicon - image
import favicon from "./img/mobile-favicon.ico"

// business - images
import shapeLeftDesktop from "./img/business/mobiletech-shape-left-desktop.png"
import shapeLeftMobile from "./img/business/mobiletech-shape-left-mobile.png"
import businessCornerShape from "./img/business/mobiletech-corner-shape.png"

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
    { img: trade, title: "Trade", btnTitle: "Trade-In", flag: "FRONTEND_TRADE", href: "#" },
    {
      img: repair,
      title: "Repair",
      btnTitle: "Repair",
      flag: "FRONTEND_REPAIR",
      href: "/quote",
    },
    {
      img: buy,
      title: "Shop",
      btnTitle: "Shop",
      flag: "FRONTEND_BUY",
      href: "https://shop.mobiletechlab.ca/",
    },
    { img: protect, title: "Insure", btnTitle: "Insure", flag: "FRONTEND_INSURE", href: "#" },
  ],
}

const cardFixData = [
  { img: cellphone, title: "Cellphone" },
  { img: tablet, title: "Tablet" },
  { img: computer, title: "Computer" },
  { img: console, title: "Console" },
  { img: other, title: "Other" },
]

const contentFixData = [
  {
    title: "TRANSPARENT REPAIRS",
    content: "We believe in a transparent repair process - know exactly what we’re going to fix on your device and what the cost is before we start.",
  },
  {
    title: "WE PRICE MATCH ANYONE",
    content: "We want you to be confident that you're getting the best price. We'll price match any local competitor's published price for the same repair and get it done faster.",
  },
  {
    title: "QUICK TURNAROUND",
    content: "We know you don't have all day so we'll return your device as quickly as possible. Most of our repairs can be performed in under two hours.",
  },
  {
    title: "LIFETIME WARRANTY",
    content: "All of our repairs are backed with our lifetime, hassle-free warranty. This warranty is valid at all of our locations worldwide.",
  },
]

const colorPalle = {
  orange: "#F36B26",
  themeColor: "#ED1D24",
  underLineCol: "#ED1D24",
  priceCol: "#054DFA",
  repairButtonCol: "#ED1D24",
  nextButtonCol: "#ED1D24",
  repairChooseItemCol: "#333333",
  repairBooktimeCol: "#ED1D24",
  textThemeCol: "#ED1D24",
  heartCol: "#ED1D24",
  chatBgCol: "#ED1D24",
  sec2SvgCol: "#ED1D24",
}

const navItemsData = [
  // { href: "#", text: "Trade", isActive: false, flag: 'FRONTEND_TRADE' },
  { href: "/quote", text: "Get Quote", isActive: false, flag: "FRONTEND_REPAIR" },
  {
    href: "https://shop.mobiletechlab.ca/",
    text: "Shop",
    isActive: false,
    flag: "FRONTEND_BUY",
  },
  {
    href: "https://www.mobiletechlabwinnipeg.ca/bounce-screen-insurance",
    text: "Protect",
    isActive: false,
    flag: "ALWAYS_TRUE",
  },
  { href: "/contact", text: "Contact", isActive: false, flag: "ALWAYS_TRUE" },
  // { href: "#", text: "Insure", isActive: false, flag: 'FRONTEND_INSURE' },
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
  otherList: ["See All Products", "See Home", "How to Sell"],
}

const brandItemsData = {
  left: [{text: 'Business', link: '/business'}, {text: 'Locations', link: '/locations'}],
  brandCol: "white",
  brandThemeCol: "#333333",
}

const avatarData = {
  userActive: userActive,
  userDeactive: userDeactive,
  cancel: cancel,
  store: { img: store, link: "https://shop.mobiletechlab.ca/" },
  storeBlue: storeBlue,
  menu: menu,
}

const mobileNavItemData = {
  left: [
    { text: "Trade", href: "#", flag: "FRONTEND_TRADE" },
    { text: "Get Quote", href: "/quote", flag: "FRONTEND_REPAIR" },
    { text: "Shop", href: "https://shop.mobiletechlab.ca/", flag: "FRONTEND_BUY" },
    { text: "Insure", href: "#", flag: "FRONTEND_INSURE" },
    { text: "Business", href: "/business", flag: "ALWAYS_TRUE" },
    { text: "Locations", href: "/locations", flag: "ALWAYS_TRUE"},
    { text: "Financing", href: "#", flag: "ALWAYS_TRUE" },
    { text: "Insurance", href: "#", flag: "ALWAYS_TRUE" },
    { text: "Find a Store", href: "#", flag: "FRONTEND_FIND_A_STORE" },
    {
      text: "Protect",
      href: "https://www.mobiletechlabwinnipeg.ca/bounce-screen-insurance",
      flag: "ALWAYS_TRUE",
    },
    { text: "Contact", href: "/contact", flag: "ALWAYS_TRUE" },
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
  { text: "My Account", href: "#", flag: "FRONTEND_USER_ACCOUNT" },
  { text: "Track Repair", href: "/quote", flag: "FRONTEND_REPAIR" },
  { text: "File a Claim", href: "#", flag: "ALWAYS_TRUE" },
  { text: "Orders", href: "#", flag: "ALWAYS_TRUE" },
  { text: "Trade-In", href: "#", flag: "FRONTEND_TRADE" },
]

const shapeData = {
  cornerShape: { img: backMTLImg, width: "" },
  mockupShape: { img: "", width: "" },
}

const homeTextData = {
  header: {
    buttonTitle: "Find a Store",
    width: "150px",
  },
  section1: {
    searchPlaceholder: "Find your device",
    city: "Winnipeg",
  },
  section2: {
    title: "What can we fix for you today?",
  },
  section3: {
    title: "Popular Devices",
    subtitle: ["Buy now. Pay later.", "Whatever works for you."],
    content: "We’ve partnered with Flexiti to offer 0% financing on repairs, devices, and accessories.",
    color: "white",
  },
  section4: {
    title: "Winnipeg's trusted mobile device shop",
    btnTitle: "Our quality charter",
  },
  section5: {
    title: "Protect Your Device with Bounce",
    content: "We've partnered with Bounce to offer you a low cost high value protection plan for your new and used devices.",
    subtitle: "As low as $39/year!",
    subcontent: "24 Hour Refunds",
    subcontentData: ["No Deductible", "Covers New and Used Phones"],
    btnTitle: "Insure My Device",
  },
  section6: {
    review: [
      {
        score: 5,
        days: "a year ago",
        content:
          "Just want you to know how pleased I am with your service. The new battery is working perfectly. Your communication throughout the process was timely and professional and helpful. The reassembly of the pixel is flawless. I can't see any evidence that the phone shell is not the original. Am glad to have come across your business. Won't hesitate to recommend you to friends. Allan Lauder",
        reviewer: "Allan Lauder",
      },
      {
        score: 5,
        days: "a year ago",
        content:
          "Excellent service! We were very impressed with the caliber of repair on my son’s iPhone. We had the screen and battery replaced, at a reasonable price. The customer service was great. Highly recommend if you are in the unfortunate position of needing a repair.",
        reviewer: "Tammy Murdoch",
      },
      {
        score: 5,
        days: "8 months ago",
        content:
          "Came to them with a cracked iPhone back. The team was engaging, kept me updated, explained everything and Best of all they were the best priced repair place in Winnipeg (I called around to them all) and fixed it same day! I will be recommending them to everyone I know.",
        reviewer: "Tony Acosta",
      },
    ],
  },
  footer: {
    title: { text: "", color: "" },
    gridVal: {
      mainGrid: [4, 8],
      subGrid: [11, 1],
    },
    copyRight: {
      year: 2021,
      text1: "All Rights Reserved. All trademarks are properties of their respective holders.",
      text2: "does not own or make claim to those trademarks used on this website in which it is not the holder."
    },
    footerLink: [
      {
        name: "Resources",
        lists: [
          { href: "#", text: "Contact Us" },
          { href: "#", text: "Warranty & Returns" },
          { href: "#", text: "Shipping" },
          { href: "#", text: "FAQs" },
        ],
      },
      {
        name: "About",
        lists: [
          { href: "#", text: "Who We Are" },
          { href: "#", text: "Financing" },
          { href: "#", text: "Blog" },
          { href: "#", text: "Terms of Service" },
        ],
      },
      {
        name: "Business",
        lists: [
          { href: "#", text: "Authorized Dealer Program" },
          { href: "#", text: "Sell With Us" },
          { href: "#", text: "Find a Location" },
          { href: "#", text: "Business Solutions" },
        ],
      },
      {
        name: "Quality",
        lists: [
          { href: "#", text: "Device Grading" },
          { href: "#", text: "Quality Control" },
          { href: "#", text: "60 Point Quality Check" },
          { href: "#", text: "What is PhoneCheck?" },
        ],
      },
    ],
  },
}

const repairData = {
  section1: {
    title: "Fix Your Device Fast!",
    content: "Answer a few questions about your damaged device and we’ll help repair it.",
    btnTitle: "Get Quote",
    themeCol: "black",
  },
  section2: {
    title: "How does repair work?",
    content: [
      {
        img: selectRepair,
        subtitle: "Select a repair category",
        content: "Make an account with us and indicate what needs to be repaired.",
        type: "SelectRepair",
      },
      {
        img: sendDevice,
        subtitle: "Get your device to us",
        content: "Find a location near you for drop off or ship to the store of your choosing.",
        type: "GetDeviceUs",
      },
      {
        img: receiveDevice,
        subtitle: "Receive your device",
        content: "repairs your device and notifies you of pick up or delivery date.",
        type: "ReceiveDevice",
      },
    ],
  },
  section3: {
    title: "From New to Reconditioned",
    content: "Choose your new phone among our 4 grades, with Mobile-tech Lab it's easy to choose for any budget!",
    children: [
      {
        subtitle: "NEW",
        subcontent: "A brand new device with no signs of wear",
        img: newImg,
      },
      {
        subtitle: "MINT",
        subcontent: "No scratches or dents",
        img: mintImg,
      },
      {
        subtitle: "GOOD",
        subcontent: "Minor scratches or dents",
        img: goodImg,
      },
      {
        subtitle: "FAIR",
        subcontent: "Visible scratchs and dents",
        img: fairImg,
      },
    ],
  },
  section4: {
    title: "Get the Latest",
    content: "Shop our selection of new and pre-owned devices!",
    btnTitle: "Shop Now",
    themeCol: "black",
    link: "https://shop.mobiletechlab.ca/"
  },
}

const getTabData = (companyName) => {
  return {
    title: `Cell Phone, iPhone & iPad Repair Winnipeg | ${companyName ? companyName : ""}`,
    metaDescription: `Same day repair of your broken, cracked, smashed or water damaged iPhone, iPad or cell phone in Winnipeg. Call ${
      companyName ? companyName : ""
    } or book your repair online today!`,
    headTag: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M2GBFK5');                      
        `,
    bodyTag: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2GBFK5"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
    scriptTag: `
    var _support = _support || { 'ui': {}, 'user': {} };
    _support['account'] = 'mobiletechlab';
    _support['ui']['contactMode'] = 'default';
    _support['ui']['enableKb'] = 'true';
    _support['ui']['styles'] = {
      widgetColor: 'rgb(237, 35, 36)',
      gradient: true,
    };
    _support['ui']['widget'] = {
      displayOn: 'all',
      label: {
        text: 'Let us know if you have any questions! 😊',
        mode: "notification",
        delay: 3,
        duration: 30,
        sound: true,
      },
      position: 'bottom-right',
      size: 50,
      mobilePosition: 'bottom-right',
      mobileSize: 50
    };
    _support['apps'] = {
      faq: {"enabled":true},
      recentConversations: {},
      orders: {}
    };
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
