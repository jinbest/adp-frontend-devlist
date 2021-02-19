// card-mobile image
import trade from "./img/cardmobile/nanotech-trade.png"
import repair from "./img/cardmobile/nanotech-repair.png"
import buy from "./img/cardmobile/nanotech-buy.png"
import protect from "./img/cardmobile/nanotech-protect.png"
import heart from "./img/cardmobile/heart.png"

// card-fix image
import cellphone from "./img/cardfix/nanotech-mobile.png"
import tablet from "./img/cardfix/nanotech-tablet.png"
import computer from "./img/cardfix/nanotech-computer.png"
import console from "./img/cardfix/nanotech-game.png"
import other from "./img/cardfix/nanotech-other.png"

// card-popular image
import camera from "./img/popular/camera.png"

// device-list images
import best from "./img/devicelist/best.png"
import warranty from "./img/devicelist/warranty.png"
import positive from "./img/devicelist/positive.png"
import amazing from "./img/devicelist/amazing.png"
import proudly from "./img/devicelist/proudly.png"

// bounce image
import bounce from "./img/bounce.png"

// avatar images
import userActive from "./img/avatar/nanotech-user-active.png"
import userDeactive from "./img/avatar/nanotech-user-deactive.png"
import menu from "./img/avatar/nanotech-menu.png"
import store from "./img/avatar/nanotech-store.png"
import storeBlue from "./img/avatar/nanotech-store-blue.png"
import cancel from "./img/avatar/nanotech-cancel.png"

// arrow images
import arrowLeft from "./img/arrow/arrow-left.png"
import arrowRight from "./img/arrow/arrow-right.png"

// shape images
import cornerShape from "./img/nanotech-corner-shape.png"
import mockupShape from "./img/nanotech-mockup-shape.png"

// footer images
import buyNow from "./img/footer/buy-now.png"
import visa from "./img/footer/visa.png"
import round from "./img/footer/round.png"
import amex from "./img/footer/amex.png"
import interactive from "./img/footer/interactive.png"
import paypal from "./img/footer/paypal.png"
import deviceListImg from "./img/footer/device-list.png"

// repair images
import repairPhone from "./img/repair/repair-phone.png"

// repair section2 - images
import selectRepair from "./img/repair/section2/nanotech-select-repair.png"
import sendDevice from "./img/repair/section2/nanotech-send-device.png"
import receiveDevice from "./img/repair/section2/nanotech-receive-device.png"

// repair section3 - images
import newImg from "./img/repair/section3/nanotech-new.png"
import mintImg from "./img/repair/section3/nanotech-mint.png"
import goodImg from "./img/repair/section3/nanotech-good.png"
import fairImg from "./img/repair/section3/nanotech-fair.png"

// repair section4 - images
import repairSec4 from "./img/repair/repair-sec4.png"

// chat - images
import chatImg from "./img/chat.png"

// logo - images
import logoHeaderImg from "./img/logo/nanotech-logo-header.png"
import logoFooterImg from "./img/logo/nanotech-logo-footer.png"

// deviceCard - images
import deviceCardImg from "./img/nanotech-device-card.png"

// favicon - image
import favicon from "./img/favicon.png"

const fav = {
    img: favicon,
}

const chatData = {
    chatImg: chatImg,
    logoHeaderImg: logoHeaderImg,
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
    heart: heart,
    data: [
        { img: trade, title: "TRADE", btnTitle: "TRADE_IN", flag: "FRONTEND_TRADE", href: "#" },
        {
            img: repair,
            title: "REPAIR",
            btnTitle: "REPAIR",
            flag: "FRONTEND_REPAIR",
            href: "/repair",
        },
        { img: buy, title: "SHOP", btnTitle: "SHOP", flag: "FRONTEND_BUY", href: "/shop" },
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
        content: "FREE_DIAGNOSTICS_CONTENT",
    },
    {
        title: "LOW_PRICE_GUARANTEE",
        content: "LOW_PRICE_GUARANTEE_CONTENT",
    },
    {
        title: "QUICK_TURNAROUND",
        content: "QUICK_TURNAROUND_CONTENT",
    },
    {
        title: "DAY_180_WARRANTY",
        content: "DAY_180_WARRANTY_CONTENT",
    },
]

const popularCardData = [
    { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "AS_LOW_AS", price: "$897" },
]

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

const colorPalle = {
    orange: "#00B0F0",
    themeColor: "#606163",
    underLineCol: "#00B0F0",
    priceCol: "#606163",
    repairButtonCol: "#00B0F0",
    nextButtonCol: "#606163",
    repairChooseItemCol: "#00B0F0",
    repairBooktimeCol: "#00B0F0",
    textThemeCol: "#00B0F0",
    heartCol: "#606163",
    chatBgCol: "#00B0F0",
    sec2SvgCol: "#00B0F0"
}

const navItemsData = [
    { href: "#", text: "TRADE", isActive: false, flag: "FRONTEND_TRADE" },
    { href: "/repair", text: "REPAIR", isActive: false, flag: "FRONTEND_REPAIR" },
    { href: "/shop", text: "SHOP", isActive: false, flag: "FRONTEND_BUY" },
    { href: "#", text: "INSURE", isActive: false, flag: "FRONTEND_INSURE" },
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
    left: ["BUSINESS", "FINANCING"],
    right: { ip: "306.569.6266", en: "ENGLISH", log: "LOG_IN" },
    brandCol: "white",
    brandThemeCol: "#606163",
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
        { text: "REPAIR", href: "/repair", flag: "FRONTEND_REPAIR" },
        { text: "SHOP", href: "#", flag: "FRONTEND_MEGA_MENU" },
        { text: "INSURE", href: "#", flag: "FRONTEND_INSURE" },
        { text: "BUSINESS", href: "#", flag: "ALWAYS_TRUE" },
        { text: "FINANCING", href: "#", flag: "ALWAYS_TRUE" },
        { text: "INSURANCE", href: "#", flag: "ALWAYS_TRUE" },
        { text: "FIND_A_STORE", href: "#", flag: "FRONTEND_FIND_A_STORE" },
        { text: "CONTACT_US", href: "#", flag: "ALWAYS_TRUE" },
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
    { text: "TRACK_REPAIR", href: "/repair", flag: "FRONTEND_REPAIR" },
    { text: "FILE_A_CLAIM", href: "#", flag: "ALWAYS_TRUE" },
    { text: "ORDERS", href: "#", flag: "ALWAYS_TRUE" },
    { text: "TRADE_IN", href: "#", flag: "FRONTEND_TRADE" },
]

const arrowData = {
    arrowLeft: arrowLeft,
    arrowRight: arrowRight,
}

const shapeData = {
    cornerShape: { img: cornerShape, width: "" },
    mockupShape: { img: mockupShape, width: "" },
}

const footerImageData = {
    buyNow: buyNow,
    deviceList: deviceListImg,
    bell: "",
    others: [visa, round, amex, interactive, paypal],
}

const homeTextData = {
    header: {
        buttonTitle: "FIND_A_STORE",
        width: "150px",
    },
    section1: {
        title: ["TRADE_REPAIR_BUY_OR_SELL", "YOUR_MOBILE_DEVICE"],
        subtitle: "SASKATCHEWAN_MOBILE_DEVICE_SPECIALISTS",
        searchPlaceholder: "FIND_YOUR_DEVICE",
        city: "Saskatchewan"
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
        title: "WELCOME_NANOTECH",
        btnTitle: "OUR_QUALITY_CHARTER",
    },
    section5: {
        img: bounce,
        title: "PROTECT_YOUR_DEVICE_WITH_BOUNCE",
        content: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_CONTENT",
        subtitle: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_SUBTITLE",
        subcontent: "PROTECT_YOUR_DEVICE_WITH_BOUNCE_SUBCONTENT",
        subcontentData: ["NO_DEDUCTIBLE", "COVERS_NEW_AND_USED_PHONES"],
        btnTitle: "INSURE_MY_DEVICE",
    },
    section6: {
        title: "SEE_WHY_CUSTOMERS_LOVE_NANOTECH",
        subtitle: "VIEW_MORE",
        review: [
            {
                score: 5,
                days: "2 days ago",
                content:
                    "Great quality service got my switch fixed fast. And was working like new. Would recommend everyone to fix their electronic here, only place I come.",
                reviewer: "Adiam Haile",
            },
            {
                score: 5,
                days: "a week ago",
                content: "Never had a problem. they always fix my tech fast and efficiently. and so friendly. good prices as well. thumbs up all the way.",
                reviewer: "Dion Gale",
            },
            {
                score: 5,
                days: "2 months ago",
                content:
                    "I have had to go to Nanotech on a few different occasions for different reasons. My iPhone screen, to replace my battery for another iPhone and now to unlock my late mom’s computer. They have always been quick to resolve, professional and compassionate to each situation. They are priced very reasonable and have always had my items back to me within the timeline given. Thank you so much.",
                reviewer: "Andrea Mundreon",
            },
        ],
    },
    footer: {
        title: { text: "", color: "" },
        gridVal: {
            mainGrid: [7, 5],
            subGrid: [6, 6],
        },
        subContent: [
            {
                title: "REGINA_NORTH",
                content:
                    "1 (306) 569 6266 | info@nanotechrepair.ca 2743 Avonhurst Drive Regina, SK",
            },
            {
                title: "REGINA_EAST",
                content:
                    "1 (306) 757 6266 | info@nanotechrepair.ca J2 2095 Prince of Wales Regina, SK",
            },
        ],
        contentSubTitle: "SASKATOON_NORTH",
        content: [
            "9, 834 – 51st Street Saskatoon, SK",
            "NANOTECH_FOOTER_CONTENT_TWO",
        ],
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
        img: repairPhone,
        themeCol: "black",
    },
    section2: {
        title: "HOW_DOES_REPAIR_WORK",
        content: [
            {
                img: selectRepair,
                subtitle: "SELECT_A_REPAIR_CATEGORY",
                content: "SELECT_A_REPAIR_CATEGORY_CONTENT",
                type: 'SelectRepair'
            },
            {
                img: sendDevice,
                subtitle: "GET_YOUR_DEVICE_TO_US",
                content: "GET_YOUR_DEVICE_TO_US_CONTENT",
                type: 'GetDeviceUs'
            },
            {
                img: receiveDevice,
                subtitle: "RECEIVE_YOUR_DEVICE",
                content: "NANOTECH_RECEIVE_YOUR_DEVICE_CONTENT",
                type: 'ReceiveDevice'
            },
        ],
    },
    section3: {
        title: "FROM_NEW_TO_RECONDITIONED",
        content: "NANOTECH_FROM_NEW_TO_RECONDITIONED_CONTENT",
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
        img: repairSec4,
        themeCol: "black",
    },
}

const getTabData = (companyName) => {
    return {
        title: `Get Quote`,
        metaDescription: `Same day repair of your broken, cracked, smashed or water damaged iPhone, iPad or cell phone in Regina, SK. Call ${
            companyName ? companyName : ""
        } or book your repair online today!`,
        headTag: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5BV2QS9');              
        `,
        bodyTag: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BV2QS9"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>              
        `,
    }
}

export {
    cardMobileData,
    colorPalle,
    cardFixData,
    contentFixData,
    popularCardData,
    devicelistData,
    navItemsData,
    brandItemsData,
    hoursData,
    avatarData,
    mobileNavItemData,
    userNavItemData,
    arrowData,
    shapeData,
    footerImageData,
    homeTextData,
    repairData,
    chatData,
    logoData,
    deviceCard,
    navShop,
    fav,
    getTabData,
}
