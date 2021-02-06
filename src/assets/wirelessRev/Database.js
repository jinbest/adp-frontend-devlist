// card-mobile image
import trade from "./img/cardmobile/wireless-trade.png"
import repair from "./img/cardmobile/wireless-repair.png"
import buy from "./img/cardmobile/wireless-buy.png"
import protect from "./img/cardmobile/wireless-protect.png"
import heart from "./img/cardmobile/heart.png"

// card-fix image
import cellphone from "./img/cardfix/wireless-mobile.png"
import tablet from "./img/cardfix/wireless-tablet.png"
import computer from "./img/cardfix/wireless-computer.png"
import console from "./img/cardfix/wireless-game.png"
import other from "./img/cardfix/wireless-other.png"

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
import userActive from './img/avatar/wireless-user-active.png'
import userDeactive from './img/avatar/wireless-user-deactive.png'
import menu from './img/avatar/wireless-menu.png'
import store from './img/avatar/wireless-store.png'
import storeBlue from './img/avatar/wireless-store-blue.png'
import cancel from './img/avatar/wireless-cancel.png'

// arrow images
import arrowLeft from './img/arrow/arrow-left.png'
import arrowRight from './img/arrow/arrow-right.png'

// shape images
import cornerShape from './img/wireless-corner-shape.png'
import mockupShape from './img/wireless-mockup-shape.png'

// footer images
import buyNow from './img/footer/buy-now.png'
import visa from './img/footer/visa.png'
import round from './img/footer/round.png'
import amex from './img/footer/amex.png'
import interactive from './img/footer/interactive.png'
import paypal from './img/footer/paypal.png'
import deviceListImg from './img/footer/device-list.png'
import bell from './img/footer/bell.png'

// repair images
import repairPhone from './img/repair/repair-phone.png'

// repair section2 - images
import selectRepair from './img/repair/section2/wireless-select-repair.png'
import sendDevice from './img/repair/section2/wireless-send-device.png'
import receiveDevice from './img/repair/section2/wireless-receive-device.png'

// repair section3 - images
import newImg from './img/repair/section3/wireless-new.png'
import mintImg from './img/repair/section3/wireless-mint.png'
import goodImg from './img/repair/section3/wireless-good.png'
import fairImg from './img/repair/section3/wireless-fair.png'

// chat - images
import chatImg from './img/chat.png';

// logo - images
import logoHeaderImg from './img/logo/wireless-logo-header.png';
import logoFooterImg from './img/logo/wireless-logo-footer.png';

// deviceCard - images
import deviceCardImg from './img/wireless-device-card.png';

// favicon - image
import favicon from './img/favicon.png'

const fav = {
    img: favicon
}

const chatData = {
    chatImg: chatImg,
    logoHeaderImg: logoHeaderImg
}

const logoData = {
    logoHeaderImg: logoHeaderImg,
    logoFooterImg: logoFooterImg
}

const deviceCard = {
    img: deviceCardImg
}

const cardMobileData = {
    gridMD: 3,
    heart: heart,
    data: [
        { img: trade, title: "TRADE", btnTitle: "TRADE_IN", flag: 'FRONTEND_TRADE' },
        { img: repair, title: "REPAIR", btnTitle: "REPAIR", flag: 'FRONTEND_REPAIR' },
        { img: buy, title: "SHOP", btnTitle: "SHOP", flag: 'FRONTEND_BUY' },
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
    orange: '#3677A1',
    themeColor: '#3677A1',
    underLineCol: '#3677A1',
    priceCol: '#3677A1',
    repairButtonCol: '#3677A1',
    nextButtonCol: '#3677A1',
    repairChooseItemCol: '#3677A1',
    repairBooktimeCol: '#3677A1',
    textThemeCol: '#3677A1',
    heartCol: '#3677A1',
    chatBgCol: '#3677A1'
}

const navItemsData = [
    { href: "#", text: "TRADE", isActive: false, flag: 'FRONTEND_TRADE' },
    { href: "/repair", text: "REPAIR", isActive: false, flag: 'FRONTEND_REPAIR' },
    { href: "#", text: "SHOP", isActive: false, flag: 'FRONTEND_MEGA_MENU' },
    { href: "#", text: "INSURE", isActive: false, flag: 'ALWAYS_TRUE' },
    { href: "#", text: "BUSINESS", isActive: false, flag: 'ALWAYS_TRUE' },
    { href: "#", text: "FINANCING", isActive: false, flag: 'ALWAYS_TRUE' },
    { href: "#", text: "WHOLESALE", isActive: false, flag: 'ALWAYS_TRUE' },
]

const navShop = {
    mainList: [
        {
            type: 'Apple',
            list: [
                'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR',
                'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone 6s Plus',
                'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6', 'iPhone SE', 'iPhone 5C', 'iPhone 5S',
                'iPhone 5', 'iPhone 4S', 'iPhone 4', 'iPhone 3GS', 'iPhone 3G',
            ]
        },
        {
            type: 'Samsung',
            list: [
                'Galaxy S10e', 'Galaxy S10 Plus', 'Galaxy S10', 'Galaxy S10 5G', 'Galaxy Note 10', 'Galaxy Note 10 Plus',
                'Galaxy Note 10 Plus G', 'Galaxy Note 9', 'Galaxy S9', 'Galaxy S9 Plus', 'Galaxy Note 8', 'Galaxy S8',
                'Galaxy S8 Plus', 'Galaxy S7', 'Galaxy S7 Edge', 'Galaxy Note 5', 'Galaxy S6 Edge Plus', 'Galaxy S6',
                'Galaxy S6 Edge', 'Galaxy Note 4', 'Galaxy Note Edge', 'Galaxy S5', 'Galaxy Note 3'
            ]
        },
        {
            type: 'Google',
            list: [
                'Google Pixel 3', 'Google Pixel 3 XL', 'Google Pixel 3a', 'Google Pixel 3a XL',
                'Google Pixel 2', 'Google Pixel 2 XL', 'Google Pixel', 'Google Pixel XL'
            ]
        },
        {
            type: 'LG',
            list: [
                'LG V20', 'LG V30', 'LG V30 ThinQ', 'LG V10', 'LG G6', 'LG G5'
            ]
        },
        {
            type: 'OnePlus',
            list: [
                'OnePlus 7 Pro 5G', 'OnePlus 7 Pro', 'OnePlus 7T', 'OnePlus 6T', 'OnePlus 6', 'OnePlus 5T',
                'OnePlus 5', 'OnePlus 3T', 'OnePlus 3', 'OnePlus 2', 'OnePlus 1', 'OnePlus X'
            ]
        },
        {
            type: 'Essential',
            list: [
                'Essential PH-1'
            ]
        }
    ],
    otherList: [
        'SEE_ALL_PRODUCTS', 'SEE_HOME', 'HOW_TO_SELL'
    ]
}

const brandItemsData = {
    left: [],
    right: {ip: "613.723.6363", en: "ENGLISH", log: "LOG_IN"},
    brandCol: 'white',
    brandThemeCol: '#4D4D4D',
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
        {text: 'TRADE', href: '#', flag: 'FRONTEND_TRADE'},
        {text: 'REPAIR', href: '/repair', flag: 'FRONTEND_REPAIR'},
        {text: 'SHOP', href: '#', flag: 'FRONTEND_MEGA_MENU'},
        {text: 'INSURE', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'BUSINESS', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'FINANCING', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'INSURANCE', href: '#', flag: 'ALWAYS_TRUE'},
        {text: 'FIND_A_STORE', href: '#', flag: 'FRONTEND_FIND_A_STORE'},
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
    {text: 'MY_ACCOUNT', href: '#', flag: 'FRONTEND_USER_ACCOUNT'},
    {text: 'TRACK_REPAIR', href: '/repair', flag: 'FRONTEND_REPAIR'},
    {text: 'FILE_A_CLAIM', href: '#', flag: 'ALWAYS_TRUE'},
    {text: 'ORDERS', href: '#', flag: 'ALWAYS_TRUE'},
    {text: 'TRADE_IN', href: '#', flag: 'FRONTEND_TRADE'},
]

const arrowData = {
    arrowLeft: arrowLeft,
    arrowRight: arrowRight
}

const shapeData = {
    cornerShape: {img: cornerShape, width: ''},
    mockupShape: {img: mockupShape, width: ''}
}

const footerImageData = {
    buyNow: buyNow,
    deviceList: deviceListImg,
    bell: bell,
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
        subtitle: 'OKOTOKS_MOBILE_DEVICE_SPECIALISTS',
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
        title: 'WELCOME_WIRELESS',
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
        title: 'SEE_WHY_CUSTOMERS_LOVE_WIRELESS',
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
            subGrid: [8, 4]
        },
        subContent: [
            {title: '', content: ''},
            {title: '', content: ''}
        ],
        contentSubTitle: '',
        content: [
            '(613) 723-6363 | info@wirelessrev.ca 4 - 1800 Bank Street, Ottawa, ON',
            'WIRELESS_FOOTER_CONTENT_TWO'
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
                content: 'WIRELESS_RECEIVE_YOUR_DEVICE_CONTENT',
            }
        ]
    },
    section3: {
        title: 'FROM_NEW_TO_RECONDITIONED',
        content: 'WIRELESS_FROM_NEW_TO_RECONDITIONED_CONTENT',
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
    repairData,
    chatData,
    logoData,
    deviceCard,
    navShop,
    fav
}
