// card-mobile image
import trade from "./img/cardmobile/mobiletech-trade.png"
import repair from "./img/cardmobile/mobiletech-repair.png"
import buy from "./img/cardmobile/mobiletech-buy.png"
import protect from "./img/cardmobile/mobiletech-protect.png"
import heart from "./img/cardmobile/heart.png"

// card-fix image
import cellphone from "./img/cardfix/mobiletech-mobile.png"
import tablet from "./img/cardfix/mobiletech-tablet.png"
import computer from "./img/cardfix/mobiletech-computer.png"
import console from "./img/cardfix/mobiletech-game.png"
import other from "./img/cardfix/mobiletech-other.png"

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
import userActive from './img/avatar/mobiletech-user-active.png'
import userDeactive from './img/avatar/mobiletech-user-deactive.png'
import menu from './img/avatar/mobiletech-menu.png'
import store from './img/avatar/mobiletech-store.png'
import storeBlue from './img/avatar/mobiletech-store-blue.png'
import cancel from './img/avatar/mobiletech-cancel.png'

// arrow images
import arrowLeft from './img/arrow/arrow-left.png'
import arrowRight from './img/arrow/arrow-right.png'

// shape images
import cornerShape from './img/mobiletech-corner-shape.png'
import mockupShape from './img/mobiletech-mockup-shape.png'

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
import selectRepair from './img/repair/section2/mobiletech-select-repair.png'
import sendDevice from './img/repair/section2/mobiletech-send-device.png'
import receiveDevice from './img/repair/section2/mobiletech-receive-device.png'

// repair section3 - images
import newImg from './img/repair/section3/mobiletech-new.png'
import mintImg from './img/repair/section3/mobiletech-mint.png'
import goodImg from './img/repair/section3/mobiletech-good.png'
import fairImg from './img/repair/section3/mobiletech-fair.png'

// repair section4 - images
import repairSec4 from './img/repair/repair-sec4.png'

// chat - images
import chatImg from './img/chat.png';

// logo - images
import logoHeaderImg from './img/logo/mobiletech-logo-header.png';
import logoFooterImg from './img/logo/mobiletech-logo-footer.png';

// deviceCard - images
import deviceCardImg from './img/mobiletech-device-card.png';

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
        { img: trade, title: "TRADE", btnTitle: "TRADE_IN", flag: 'FRONTEND_TRADE', href: "#" },
        { img: repair, title: "REPAIR", btnTitle: "REPAIR", flag: 'FRONTEND_REPAIR', href: "/repair" },
        { img: buy, title: "SHOP", btnTitle: "SHOP", flag: 'FRONTEND_BUY', href: "https://shop.mobiletechlab.ca/" },
        { img: protect, title: "INSURE", btnTitle: "INSURE", flag: 'ALWAYS_TRUE', href: "#" },
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
        title: "LIFETIME_WARRANTY",
        content: "LIFETIME_WARRANTY_CONTENT",
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
    orange: '#F36B26',
    themeColor: '#ED1D24',
    underLineCol: '#ED1D24',
    priceCol: '#054DFA',
    repairButtonCol: '#ED1D24',
    nextButtonCol: '#ED1D24',
    repairChooseItemCol: '#333333',
    repairBooktimeCol: '#ED1D24',
    textThemeCol: '#ED1D24',
    heartCol: '#ED1D24',
    chatBgCol: '#ED1D24'
}

const navItemsData = [
    // { href: "#", text: "TRADE", isActive: false, flag: 'FRONTEND_TRADE' },
    { href: "/repair", text: "REPAIR", isActive: false, flag: 'FRONTEND_REPAIR' },
    { href: "https://shop.mobiletechlab.ca/", text: "SHOP", isActive: false, flag: 'FRONTEND_BUY' },
    // { href: "#", text: "INSURE", isActive: false, flag: 'ALWAYS_TRUE' },
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
    right: {ip: "204.808.9416", en: "ENGLISH", log: ""},
    brandCol: 'white',
    brandThemeCol: '#333333',
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
    store: { img: store, link: 'https://shop.mobiletechlab.ca/' },
    storeBlue: storeBlue,
    menu: menu
}

const mobileNavItemData = {
    left: [
        {text: 'TRADE', href: '#', flag: 'FRONTEND_TRADE'},
        {text: 'REPAIR', href: '/repair', flag: 'FRONTEND_REPAIR'},
        {text: 'SHOP', href: 'https://shop.mobiletechlab.ca/', flag: 'FRONTEND_BUY'},
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
        title: ['WINNIPEG_PROFESSIONAL', 'PHONE_REPAIR'],
        subtitle: 'SAME_DAY_ADVANCED_REPAIR_SERVICE',
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
        title: 'WELCOME_MOBILE_TECH',
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
        title: 'SEE_WHY_CUSTOMERS_LOVE_MOBILE_TECH',
        subtitle: 'VIEW_MORE',
        review: [
            {
                score: 5,
                days: "October 22, 2020",
                content:
                    "I needed a new battery for my iphone 6. After contacting several places who all told me the next available appointment was more than a week away, I called Mobile Tech on Corydon. Within 2 hours, my new battery was installed and ready for pickup. Great service and friendly staff.",
                reviewer: "Pepo",
            },
            {
                score: 4,
                days: "November 9, 2020",
                content: "Very glad I found this place! I send a request through FB to couple places asking for an estimate of the screen replacement and Mobile Tech Lab not only has automated estimation but they gave me a call almost right away to confirm that they have a part and it would be done in ... more",
                reviewer: "Elena Kurakin",
            },
            {
                score: 5,
                days: "November 2, 2020",
                content:
                    "My experience was excepion really amazing people working there with reasonable prices for fixing electronics, they fix your electronics with a super reasonable time frame,.would highly recommend this company!",
                reviewer: "Jessica Johnson",
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
            '2020 Corydon Ave, Unit F Winnipeg, MB',
            'MOBILE_TECH_FOOTER_CONTENT_TWO'
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
                content: 'MOBILE_TECH_RECEIVE_YOUR_DEVICE_CONTENT',
            }
        ]
    },
    section3: {
        title: 'FROM_NEW_TO_RECONDITIONED',
        content: 'MOBILE_TECH_FROM_NEW_TO_RECONDITIONED_CONTENT',
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
    },
    section4: {
        title: 'GET_THE_LATEST',
        content: 'SHOP_SELECTION_OF_NEW_AND_PREOWNED_DEVICE',
        btnTitle: 'SHOP_NOW',
        img: repairSec4,
        themeCol: 'black'
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
