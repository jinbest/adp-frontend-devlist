// card-mobile image
import trade from "./img/cardmobile/trade.png"
import repair from "./img/cardmobile/repair.png"
import buy from "./img/cardmobile/buy.png"
import protect from "./img/cardmobile/protect.png"

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

const cardMobileData = [
    { img: trade, title: "TRADE", btnTitle: "Trade-in" },
    { img: repair, title: "REPAIR", btnTitle: "Repair" },
    { img: buy, title: "BUY", btnTitle: "Buy" },
    { img: protect, title: "PROTECT", btnTitle: "Protect" },
]

const cardFixData = [
    { img: cellphone, title: "Cellphone" },
    { img: tablet, title: "Tablet" },
    { img: computer, title: "Computer" },
    { img: console, title: "Console" },
    { img: other, title: "Other" },
]

const contentFixData = [
    {
        title: "FREE DIAGNOSTICS",
        content: 
            "We believe in a transparent repair process. If you’re not sure what’s wrong with your device, we’ll diagnose it for free.",
    },
    {
        title: "LOW PRICE GUARANTEE",
        content:
            "We want you to be confident that you’re getting the best price. We’ll match any local competitor’s published price for the same repair and beat it by $5.",
    },
    {
        title: "QUICK TURNAROUND",
        content:
            "We know you don’t have all day so we’ll return your device as quickly as possible. Most of our repairs can be performed in under two hours.",
    },
    {
        title: "6 MONTH WARRANTY",
        content:
            "All of our repairs are backed with our 6 month, hassle-free warranty. This warranty is valid at all of our locations worldwide.",
    }
]

const popularCardData = [
    { img: camera, title: "iPhone 11 Pro", subtitle: "As low as /", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "As low as /", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "As low as /", price: "$897" },
    { img: camera, title: "iPhone 11 Pro", subtitle: "As low as /", price: "$897" },
]

const devicelistData = [
    {
        img: best,
        title: "Best offer available",
        content: "Selected by our price-quality algorithm",
    },
    {
        img: warranty,
        title: "1 Year Warranty",
        content: "Our partner merchants are continously monitored.",
    },
    { img: amazing, title: "Amazing Service", content: "Secure shopping experience." },
    {
        img: positive,
        title: "Positive Impact",
        content: "An alternative to new, joyful and elegant.",
    },
    { img: proudly, title: "Proudly Canadian", content: "Canadian owned and Canadian based." },
]

const colorPalle = {
    orange: '#F67500',
    themeColor: '#2B388F',
    priceCol: '#F67500'
}

const navItemsData = [
    { href: "#", text: "Trade", isActive: false },
    { href: "/repair", text: "Repair", isActive: false },
    { href: "#", text: "Buy", isActive: false },    
    { href: "#", text: "Protect", isActive: false },
]

const brandItemsData = {
    left: ["BUSINESS", "FINANCING"],
    right: {ip: "819.700.2221", en: "ENGLISH", log: "LOG IN"},
}

const hoursData = [
    { day: "Monday", time: "9:00 a.m. - 5:00 p.m." },
    { day: "Tuesday", time: "9:00 a.m. - 5:00 p.m." },
    { day: "Wednesday", time: "9:00 a.m. - 5:00 p.m." },
    { day: "Thursday", time: "9:00 a.m. - 5:00 p.m." },
    { day: "Friday", time: "9:00 a.m. - 5:00 p.m." },
    { day: "Saturday", time: "11:00 a.m. - 4:00 p.m." },
    { day: "Sunday", time: "Closed" },
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
        {text: 'Trade', href: '#'},
        {text: 'Repair', href: '#/repair'},
        {text: 'Buy', href: '#'},
        {text: 'Protect', href: '#'},
        {text: 'Business', href: '#'},
        {text: 'Financing', href: '#'},
        {text: 'Insurance', href: '#'},
        {text: 'Find a Store', href: '#'},
        {text: 'Conact Us', href: '#'},
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
    {text: 'My Account', href: '#'},
    {text: 'Tracking', href: '#'},
    {text: 'Orders', href: '#'},
    {text: 'Trade-In', href: '#'},
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
    others: [
        visa, round, amex, interactive, paypal
    ]
}

const homeTextData = {
    section1: {
        title: ['Trade, repair, buy or sell your ', 'mobile device'],
        subtitle: 'Your affordable solutions for technology in the North'
    },
    section2: {
        title: 'What can we fix for you today?'
    },
    section3: {
        title: 'Popular Devices',
        subtitle: ['Buy now. Pay later.', 'Whatever works for you.'],
        content: 'We’ve partnered with Flexiti to offer 0% financing on repairs, devices, and accessories.',
        color: 'black'
    },
    section4: {
        title: 'Welcome to NorthTech Solutions, your affordable solutions for technology in the North'
    },
    section5: {
        img: bounce,
        title: "Protect Your Device with Bounce",
        content:
            "We've partnered with Bounce to offer you a low cost high value protection plan for your new and used devices.",
        subtitle: "As low as $39/year!",
        subcontent: "24 Hour Refunds",
        subcontentData: ["No Deductible", "Covers New and Used Phones"],
        btnTitle: "Insure My Device",
    },
    section6: {
        title: 'See Why Customers Love NorthTech Solutions',
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
        title: { text: 'Giving Back to the North', color: 'white' },
        content: [
            '(819) 700-2211 | info@northtechsolutions.ca 208 Sinaa, Iqaluit, NU',
            '© 2020 NorthTech Solutions 1.0.2. All Rights Reserved. All trademarks are properties of their respective holders. 11253913 Canada Inc. o/a "NorthTech Solutions" does not own or make claim to those trademarks used on this website in which it is not the holder.'
        ],
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
                    { href: "#", text: "Finance ing" },
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
        ]
    }
}

const repairData = {
    section1: {
        title: 'Fix Your Device Fast!',
        content: 'Answer a few questions about your damaged device and we’ll help repair it.',
        btnTitle: 'Get Quote',
        img: repairPhone,
        themeCol: 'black'
    },
    section2: {
        title: 'How does repair work?',
        content: [
            {
                img: selectRepair, 
                subtitle: 'Select a repair category', 
                content: 'Make an account with us and indicate what needs to be repaired.',
            },
            {
                img: sendDevice,
                subtitle: 'Send us your device',
                content: 'Find a location near you for drop off or ship to the store of your choosing.',
            },
            {
                img: receiveDevice,
                subtitle: 'Receive your device',
                content: 'NorthTech Solutions repairs your device and notifies you of pick up or delivery date.',
            }
        ]
    },
    section3: {
        title: 'From New to Reconditioned',
        content: 'Choose your new phone among our 4 grades, with NorthTech Solutions it\'s easy to choose for any budget!',
        children: [
            {
                subtitle: 'NEW',
                subcontent: 'A brand new device with no signs of wear',
                img: newImg
            },
            {
                subtitle: 'MINT',
                subcontent: 'No scratches or dents',
                img: mintImg
            },
            {
                subtitle: 'GOOD',
                subcontent: 'Minor scratches or dents',
                img: goodImg
            },
            {
                subtitle: 'FAIR',
                subcontent: 'Visible scratchs and dents',
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
