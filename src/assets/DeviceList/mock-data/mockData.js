// repair-device-brand images
import apple from './repair-widget/device-brand/apple.png'
import asus from './repair-widget/device-brand/asus.png'
import blackberry from './repair-widget/device-brand/blackberry.png'
import google from './repair-widget/device-brand/google.png'
import lg from './repair-widget/device-brand/lg.png'
import motorola from './repair-widget/device-brand/motorola.png'
import oneplus from './repair-widget/device-brand/oneplus.png'
import other from './repair-widget/device-brand/other.png'
import samsung from './repair-widget/device-brand/samsung.png'
import sony from './repair-widget/device-brand/sony.png'
import xiaomi from './repair-widget/device-brand/xiaomi.png'

// repair-device-model
import iPhoneHalf from './repair-widget/device-model/iPhone-half.png'
import iPhoneWhole from './repair-widget/device-model/iPhone-whole.png'

const repairWidget = {
  deviceBrand: {
    title: 'Choose Your Device Brand',
    placeholder: 'Search for your Device Brand or enter IMEI',
    mainTopic: {
      title: 'Find your device’s brand',
      content: [
        'Apple, Samsung, Huawei, Sony, etc. are examples of device brands(manufactures). If you don\'t know the brand of your device, don\'t panic!',
        'It is indicated on back of the device, on the front, or in the Settings/System/About phone section if you are on Android or Settings/Apple IDs if you are on IOS. It may also be shown on the original box and/or manual that came with your device.'
      ]
    },
    disableTopic: {
      title: 'How to find the model of your device',
      content: 'The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device.'
    },
    images: [
      { name: 'apple', img: apple },
      { name: 'samsung', img: samsung },
      { name: 'google', img: google },
      { name: 'lg', img: lg },
      { name: 'motorola', img: motorola },
      { name: 'asus', img: asus },
      { name: 'sony', img: sony },
      { name: 'oneplus', img: oneplus },
      { name: 'blackberry', img: blackberry },
      { name: 'xiaomi', img: xiaomi },
      { name: 'other', img: other },
    ],
  },
  deviceModel: {
    title: 'Choose Your Device Model / Apple',
    placeholder: 'Search for your Model',
    mainTopic: {
      title: 'How to find the model of your device',
      content: [
        'The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device.',
      ]
    },
    disableTopic: { title: '', content: '' },
    images: [
      { name: 'iPhone 11 Pro Max', img: iPhoneHalf },
      { name: 'iPhone 11 Pro', img: iPhoneHalf },
      { name: 'iPhone 11', img: iPhoneHalf },
      { name: 'iPhone XS Max', img: iPhoneHalf },
      { name: 'iPhone XS', img: iPhoneHalf },
      { name: 'iPhone XR', img: iPhoneHalf },
      { name: 'iPhone X', img: iPhoneHalf },
      { name: 'iPhone SE 2020', img: iPhoneHalf },
      { name: 'iPhone 8 Plus', img: iPhoneHalf },
      { name: 'iPhone 8', img: iPhoneHalf },
      { name: 'iPhone 7 Plus', img: iPhoneHalf },
      { name: 'iPhone 7', img: iPhoneHalf },
      { name: 'iPhone 6S Plus', img: iPhoneHalf },
      { name: 'iPhone 6 Plus', img: iPhoneHalf },
    ],
  },
  deviceRepairs: {
    title: 'Choose Your Repair(s)',
    placeholder: 'What’s broken?',
    mainTopic: {
      title: 'Estimated repair time',
      content: []
    },
    types: [
      { name: 'Back Glass', bg: 'white', col: 'black', estimate: '35 minutes' },
      { name: 'Battery', bg: 'white', col: 'black', estimate: '60 minutes' },
      { name: 'Camera (Front)', bg: 'white', col: 'black', estimate: '135 minutes' },
      { name: 'Camera (Back)', bg: 'white', col: 'black', estimate: '155 minutes' },
      { name: 'Charging Port', bg: 'white', col: 'black', estimate: '275 minutes' },
      { name: 'Screen', bg: 'white', col: 'black', estimate: '55 minutes' },
    ],
  },
  repairAnotherDevice: {
    title: 'Repair Another Device?',
    mainTopic: {
      title: 'Repair another device?',
      content: 'Repair all your devices at once with us!'
    }
  },
  dropOffDevicce: {
    title: 'How Would You Like to Drop-Off Your Device(s)?',
    mainTopic: {
      title: 'Repair summary',
      content: [
        { img: iPhoneWhole, subtitle: 'iPhone 11', service: 'Repair Service:', details: ['Camera (Back)', 'Charging Port'] },
        { img: iPhoneWhole, subtitle: 'iPhone 11', service: 'Repair Service:', details: ['Screen', 'Charging Port'] },
      ]
    },
    types: [
      { name: 'Walk-In', bg: 'white', col: 'black' },
      { name: 'Mail-In', bg: 'white', col: 'black' },
      { name: 'Pick-Up/ Drop-Off Service', bg: 'white', col: 'black' },
      { name: 'Curbside Drop-Off', bg: 'white', col: 'black' },
    ],
  },
  receiveQuote: {
    title: 'How Would You Like to Receive Your Quote?',
    mainTopic: {
      title: 'Repair summary',
      content: [
        { img: iPhoneWhole, subtitle: 'iPhone 11', service: 'Repair Service:', details: ['Camera (Back)', 'Charging Port'] },
        { img: iPhoneWhole, subtitle: 'iPhone 11', service: 'Repair Service:', details: ['Screen', 'Charging Port'] },
      ]
    },
    types: [
      { name: 'Email', bg: 'white', col: 'black' },
      { name: 'Text', bg: 'white', col: 'black' },
      { name: 'Phone Call', bg: 'white', col: 'black' },
    ],
  }
}

export {
  repairWidget
}