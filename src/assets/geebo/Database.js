// card-mobile image
import trade from "./img/cardmobile/trade.png"
import repair from "./img/cardmobile/repair.png"
import buy from "./img/cardmobile/buy.png"
import protect from "./img/cardmobile/protect.png"
import heart from "./img/cardmobile/heart.png"

// card-fix image
import cellphone from "./img/cardfix/mobile.png"
import tablet from "./img/cardfix/tablet.png"
import computer from "./img/cardfix/computer.png"
import console from "./img/cardfix/game.png"
import other from "./img/cardfix/other.png"

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
import userActive from './img/avatar/user-active.png'
import userDeactive from './img/avatar/user-deactive.png'
import menu from './img/avatar/menu.png'
import store from './img/avatar/store.png'
import storeBlue from './img/avatar/store-blue.png'
import cancel from './img/avatar/cancel.png'

// arrow images
import arrowLeft from './img/arrow/arrow-left.png'
import arrowRight from './img/arrow/arrow-right.png'

// shape images
import cornerShape from './img/shape-home.png'


// footer images
import buyNow from './img/footer/buy-now.png'
import visa from './img/footer/visa.png'
import round from './img/footer/round.png'
import amex from './img/footer/amex.png'
import interactive from './img/footer/interactive.png'
import paypal from './img/footer/paypal.png'
import deviceListImg from './img/footer/device-list.png'

// repair images
import repairPhone from './img/repair/repair-phone.png'

// repair section2 - images
import selectRepair from './img/repair/section2/select-repair.png'
import sendDevice from './img/repair/section2/send-device.png'
import receiveDevice from './img/repair/section2/receive-device.png'

// repair section3 - images
import newImg from './img/repair/section3/new.png'
import mintImg from './img/repair/section3/mint.png'
import goodImg from './img/repair/section3/good.png'
import fairImg from './img/repair/section3/fair.png'

const cardMobileData = {
    gridMD: 3,
    heart: heart,
    data: [
        { img: trade, title: "TRADE", btnTitle: "TRADE_IN", flag: 'FEATURE_TRADE' },
        { img: repair, title: "REPAIR", btnTitle: "REPAIR", flag: 'FEATURE_REPAIR' },
        { img: buy, title: "SHOP", btnTitle: "SHOP", flag: 'FEATURE_SHOP' },
        { img: protect, title: "INSURE", btnTitle: "INSURE", flag: 'ALWAYS_TRUE' },
    ]
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
        title: "DAY_90_WARRANTY",
        content: "DAY_90_WARRANTY_CONTENT",
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
        content: "AMAZING_SERVICE_CONTENT" 
    },
    {
        img: positive,
        title: "POSITIVE_IMPACT",
        content: "POSITIVE_IMPACT_CONTENT",
    },
    { 
        img: proudly, 
        title: "PROUDLY_CANADIAN", 
        content: "PROUDLY_CANADIAN_CONTENT" 
    },
]

const colorPalle = {
    orange: '#585758',
    themeColor: '#6EB24F',
    underLineCol: '#585758',
    priceCol: '#6EB24F',
    repairButtonCol: '#6EB24F',
    nextButtonCol: '#6EB24F',
    repairChooseItemCol: '#6EB24F',
    repairBooktimeCol: '#6EB24F',
    textThemeCol: '#6EB24F',
    heartCol: '#6EB24F',
    chatBgCol: '#6EB24F'
}

const navItemsData = [
    { href: "#", text: "TRADE", isActive: false, flag: 'FEATURE_TRADE' },
    { href: "/repair", text: "REPAIR", isActive: false, flag: 'FEATURE_REPAIR' },
    { href: "#", text: "SHOP", isActive: false, flag: 'FEATURE_SHOP' },
    { href: "#", text: "INSURE", isActive: false, flag: 'ALWAYS_TRUE' },
]

const brandItemsData = {
    left: ["BUSINESS", "FINANCING", "INSURANCE"],
    right: {ip: "902.270.4349", en: "ENGLISH", log: "LOG_IN"},
    brandCol: 'white',
    brandThemeCol: '#6EB24F',
    selectOption: ['ENGLISH', 'FRENCH']
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
    store: store,
    storeBlue: storeBlue,
    menu: menu
}

const mobileNavItemData = {
    left: [
        {text: 'TRADE', href: '#', flag: 'FEATURE_TRADE'},
        {text: 'REPAIR', href: '/repair', flag: 'FEATURE_REPAIR'},
        {text: 'SHOP', href: '#', flag: 'FEATURE_SHOP'},
        {text: 'INSURE', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'BUSINESS', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'FINANCING', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'INSURANCE', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'FIND_A_STORE', href: '#', flag: 'FEATURE_FIND_A_STORE'},
        {text: 'CONTACT_US', href: '#', flag: 'ALWAYS_TRUE'},
    ],
    right: [
        {text: 'Apple', href: '#'},
        {text: 'Samsung', href: '#'},
        {text: 'Google', href: '#'},
        {text: 'LG', href: '#'},
        {text: 'OnePlus', href: '#'},
    ],
}

const userNavItemData = [
    {text: 'MY_ACCOUNT', href: '#', flag: 'FEATURE_USER_ACCOUNT'},
    {text: 'TRACK_REPAIR', href: '/repair', flag: 'FEATURE_REPAIR'},
    {text: 'FILE_A_CLAIM', href: '#', flag: 'ALWAYS_TRUE'},
    {text: 'ORDERS', href: '#', flag: 'ALWAYS_TRUE'},
    {text: 'TRADE_IN', href: '#', flag: 'FEATURE_TRADE'},
]

const arrowData = {
    arrowLeft: arrowLeft,
    arrowRight: arrowRight
}

const shapeData = {
    cornerShape: {img: cornerShape, width: '100vw'},
    mockupShape: ''
}

const footerImageData = {
    buyNow: buyNow,
    deviceList: deviceListImg,
    bell: '',
    others: [
        visa, round, amex, interactive, paypal
    ]
}

const homeTextData = {
    header: {
        buttonTitle: 'FIND_A_STORE',
        width: '150px'
    },
    section1: {
        title: ['TRADE_REPAIR_BUY_OR_SELL', 'YOUR_MOBILE_DEVICE'],
        subtitle: 'NOVA_SCOTIA_MOBILE_DEVICE_SPECIALISTS',
        searchPlaceholder: 'FIND_YOUR_DEVICE'
    },
    section2: {
        title: 'WHAT_CAN_WE_FIX_FOR_YOU_TODAY'
    },
    section3: {
        title: 'POPULAR_DEVICES',
        subtitle: ['BUY_NOW_PAY_LATER', 'WHATEVER_WORKS_FOR_YOU'],
        content: 'POPULAR_DEVICES_CONTENT',
        color: 'white'
    },
    section4: {
        title: 'WELCOME_GEEBO',
        btnTitle: 'OUR_QUALITY_CHARTER'
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
        title: 'SEE_WHY_CUSTOMERS_LOVE_GEEBO',
        subtitle: 'VIEW_MORE',
        review: [
            {
                score: 5,
                days: "3 days ago",
                content:
                    "This was by far the easiest way to sell your old cell phone. Simple fast and got a very good price for my phone.",
                reviewer: "Philip Sizemore",
            },
            {
                score: 4,
                days: "6 days ago",
                content: "Super easy to use and quick too!",
                reviewer: "Anonymous",
            },
            {
                score: 5,
                days: "3 days ago",
                content:
                    "This was by far the easiest way to sell your old cell phone. Simple fast and got a very good price for my phone.",
                reviewer: "Philip Sizemore",
            },
        ]
    },
    footer: {
        title: { text: '', color: '' },
        gridVal: {
            mainGrid: [4, 8],
            subGrid: [11, 1]
        },
        subContent: [
            {title: '', content: ''},
            {title: '', content: ''}
        ],
        contentSubTitle: '',
        content: [
            '(902) 270-4349 | 306 Charlotte St., Halifax, NS',
            'GEEBO_FOOTER_CONTENT_TWO'
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
        ]
    }
}

const repairData = {
    section1: {
        title: 'FIX_YOUR_DEVICE_FAST',
        content: 'FIX_YOUR_DEVICE_FAST_CONTENT',
        btnTitle: 'GET_QUOTE',
        img: repairPhone,
        themeCol: 'black'
    },
    section2: {
        title: 'HOW_DOES_REPAIR_WORK',
        content: [
            {
                img: selectRepair, 
                subtitle: 'SELECT_A_REPAIR_CATEGORY', 
                content: 'SELECT_A_REPAIR_CATEGORY_CONTENT',
            },
            {
                img: sendDevice,
                subtitle: 'SEND_US_YOUR_DEVICE',
                content: 'SEND_US_YOUR_DEVICE_CONTENT',
            },
            {
                img: receiveDevice,
                subtitle: 'RECEIVE_YOUR_DEVICE',
                content: 'GEEBO_RECEIVE_YOUR_DEVICE_CONTENT',
            }
        ]
    },
    section3: {
        title: 'FROM_NEW_TO_RECONDITIONED',
        content: 'GEEBO_FROM_NEW_TO_RECONDITIONED_CONTENT',
        children: [
            {
                subtitle: 'NEW',
                subcontent: 'NEW_CONTENT',
                img: newImg
            },
            {
                subtitle: 'MINT',
                subcontent: 'MINT_CONTENT',
                img: mintImg
            },
            {
                subtitle: 'GOOD',
                subcontent: 'GOOD_CONTENT',
                img: goodImg
            },
            {
                subtitle: 'FAIR',
                subcontent: 'FAIR_CONTENT',
                img: fairImg
            }
        ]
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
    repairData
}
