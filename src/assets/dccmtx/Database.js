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
      href: "http://northtechshop.ca/",
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
    title: "6 MONTH WARRANTY",
    content: "All of our repairs are backed with our 6 month, hassle-free warranty. This warranty is valid at all of our locations worldwide.",
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
  { href: "#", text: "Trade", isActive: false, flag: "FRONTEND_TRADE" },
  { href: "/quote", text: "Repair", isActive: false, flag: "FRONTEND_REPAIR" },
  { href: "http://northtechshop.ca/", text: "Shop", isActive: false, flag: "FRONTEND_BUY" },
  { href: "#", text: "Insure", isActive: false, flag: "FRONTEND_INSURE" },
  { href: "/contact", text: "Contact", isActive: false, flag: "ALWAYS_TRUE" },
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
  left: [{text: 'Business', link: '/business'}, {text: 'Financing', link: '#'}, {text: 'Locations', link: '/locations'}],
  brandCol: "white",
  brandThemeCol: "#F67500",
}

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
    { text: "Trade", href: "#", flag: "FRONTEND_TRADE" },
    { text: "Repair", href: "/quote", flag: "FRONTEND_REPAIR" },
    { text: "Shop", href: "http://northtechshop.ca/", flag: "FRONTEND_BUY" },
    { text: "Insure", href: "#", flag: "FRONTEND_INSURE" },
    { text: "Business", href: "/business", flag: "ALWAYS_TRUE" },
    { text: "Locations", href: "/locations", flag: "ALWAYS_TRUE"},
    { text: "Financing", href: "#", flag: "ALWAYS_TRUE" },
    { text: "Insurance", href: "#", flag: "ALWAYS_TRUE" },
    { text: "Find a Store", href: "#", flag: "FRONTEND_FIND_A_STORE" },
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
  cornerShape: { img: cornerShape, width: "100%" },
  mockupShape: "",
}

const homeTextData = {
  header: {
    buttonTitle: "Find a Store",
    width: "150px",
  },
  section1: {
    searchPlaceholder: "Find your device",
    city: "Nunavut",
  },
  section2: {
    title: "What can we fix for you today?",
  },
  section3: {
    title: "Popular Devices",
    subtitle: ["Buy now. Pay later.", "Whatever works for you."],
    content: "We’ve partnered with Flexiti to offer 0% financing on repairs, devices, and accessories.",
    color: "black",
  },
  section4: {
    title: "Welcome to NorthTech Cell Solutions, your affordable solutions for technology in the North",
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
    title: { text: "Giving Back to the North", color: "white" },
    gridVal: {
      mainGrid: [4, 8],
      subGrid: [11, 1],
    },
    copyRight: {
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
    content: "Choose your new phone among our 4 grades, with NorthTech Solutions it's easy to choose for any budget!",
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
    link: "http://northtechshop.ca/"
  },
}

const getTabData = (companyName) => {
  return {
    title: `Cell Phone, iPhone & iPad Repair Iqaluit | ${companyName ? companyName : ""}`,
    metaDescription: `Same day repair of your broken, cracked, smashed or water damaged iPhone, iPad or cell phone in Iqaluit. Call ${
      companyName ? companyName : ""
    } or book your repair online today!`,
    locTitle: '',
    locMetaDes: '',
    contactTitle: `Contact Us | ${companyName ? companyName : ''}`,
    contactMetaDes: 'Request a quote, book an appointment online or give us a call - we\'re Nunavut\'s fastest and most professional phone, tablet, laptop and game console repair destination.',
    businessTitle: `Business Solutions | ${companyName ? companyName : ''}`,
    businessMetaDes: `We provide reliable device management and repair services so you can focus on running your business. Contact ${companyName ? companyName : ''} today for bulk or ongoing repair services.`,
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
