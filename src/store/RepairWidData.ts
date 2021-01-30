import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class RepairWidData {

  @observable repairDeviceBrands: any = {};
  @observable repairBrandProducts: any = {};
  @observable repairWidgetLookup: any = {};
  @observable repairDeliveryMethod: any[] = [];
  @observable repairsOfferedDevices: any = {};
  @observable apiDropOffDevices: any = {};
  @observable receiveQuote: any = {};
  @observable cntBrandID: number = 0;
  @observable cntProductID: number = 0;

  constructor() {
    this.load();
    autorun(this.save);
  }

  private save = () =>
    window.localStorage.setItem(
      RepairWidData.name,
      JSON.stringify({
        repairDeviceBrands: this.repairDeviceBrands,
        repairBrandProducts: this.repairBrandProducts,
        repairWidgetLookup: this.repairWidgetLookup,
        repairDeliveryMethod: this.repairDeliveryMethod,
        repairsOfferedDevices: this.repairsOfferedDevices,
        apiDropOffDevices: this.apiDropOffDevices,
        receiveQuote: this.receiveQuote,
        cntBrandID: this.cntBrandID,
        cntProductID: this.cntProductID,
      })
    )

  @action
  private load = () =>
    Object.assign(this, JSON.parse(window.localStorage.getItem(RepairWidData.name) || '{}'))

  @action
  changeRepairDeviceBrands = (repairDeviceBrands: any) => {
    this.repairDeviceBrands = repairDeviceBrands
    this.save()
  }

  @action
  changeRepairBrandProducts = (repairBrandProducts: any) => {
    this.repairBrandProducts = repairBrandProducts
    this.save()
  }

  @action
  changeRepairWidgetLookup = (repairWidgetLookup: any) => {
    this.repairWidgetLookup = repairWidgetLookup
    this.save()
  }

  @action
  changeRepairWidDeliveryMethod = (repairDeliveryMethod: any[]) => {
    this.repairDeliveryMethod = repairDeliveryMethod
    this.save()
  }

  @action
  changeRepairsOfferedDevice = (repairsOfferedDevices: any) => {
    this.repairsOfferedDevices = repairsOfferedDevices
    this.save()
  }

  @action
  changeApiDropOffDevices = (apiDropOffDevices: any) => {
    this.apiDropOffDevices = apiDropOffDevices
    this.save()
  }

  @action
  changeReceiveQuote = (receiveQuote: any) => {
    this.receiveQuote = receiveQuote
    this.save()
  }

  @action
  changeCntBrandID = (cntBrandID: number) => {
    this.cntBrandID = cntBrandID
    this.save()
  }

  @action
  changeCntProductID = (cntProductID: number) => {
    this.cntProductID = cntProductID
    this.save()
  }

}

export default new RepairWidData();