import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class RepairWidgetStore {

  @observable deviceBrand: any = { name: '', img: '' }
  @observable deviceModel: any = { name: '', img: '' }
  @observable chooseRepair: any[] = []
  @observable deliveryMethod: any = { method: '', caseKey: 0 }
  @observable receiveQuote: any = { method: '', caseKey: 0 }
  @observable contactDetails: any = { 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    province: '',
    postalCode: ''
  }
  @observable bookData: any[] = [
    { sendTo: '' },
    { address: '', time: '', day: '', month: '', year: '', week: '' },
    { address: '', time: '', day: '', month: '', year: '', week: '' },
    { address: '', time: '', day: '', month: '', year: '', week: '' },
  ]
  @observable message: string = ''
  @observable cntStep: number = 0

  constructor() {
    this.load()
    autorun(this.save)
  }

  private save = () =>
    window.localStorage.setItem(
      RepairWidgetStore.name,
      JSON.stringify({
        deviceBrand: this.deviceBrand,
        deviceModel: this.deviceModel,
        chooseRepair: this.chooseRepair,
        deliveryMethod: this.deliveryMethod,
        receiveQuote: this.receiveQuote,
        contactDetails: this.contactDetails,
        bookData: this.bookData,
        message: this.message,
        cntStep: this.cntStep
      })
    )

  @action
  private load = () =>
    Object.assign(this, JSON.parse(window.localStorage.getItem(RepairWidgetStore.name) || '{}'))

  @action
  changeDeviceBrand = (deviceBrand: any) => {
    this.deviceBrand = deviceBrand
    this.save()
  }

  @action
  changeDeviceModel = (deviceModel: any) => {
    this.deviceModel = deviceModel
    this.save()
  }

  @action
  changeChooseRepair = (chooseRepair: any) => {
    this.chooseRepair = chooseRepair
    this.save()
  }

  @action
  changeDeliveryMethod = (deliveryMethod: any) => {
    this.deliveryMethod = deliveryMethod
    this.save()
  }

  @action
  changeReceiveQuote = (receiveQuote: any) => {
    this.receiveQuote = receiveQuote
    this.save()
  }

  @action
  changeContactDetails = (contactDetails: any) => {
    this.contactDetails = contactDetails
    this.save()
  }

  @action
  changeBookData = (bookData: any) => {
    let caseKey = bookData.caseKey, cntBookData = this.bookData
    cntBookData[caseKey] = bookData.data
    this.bookData = cntBookData
    this.save()
  }

  @action
  changeMessage = (message: any) => {
    this.message = message
    this.save()
  }

  @action
  changeCntStep = (cntStep: number) => {
    this.cntStep = cntStep
    this.save()
  }
}

export default new RepairWidgetStore();