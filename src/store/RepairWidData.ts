import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class RepairWidData {

  @observable repairWidgetLookup: any = {};
  @observable repairDeliveryMethod: any[] = [];
  @observable repairsOfferedDevices: any = {};
  @observable apiDropOffDevices: any = {};
  @observable receiveQuote: any = {};

  constructor() {
    this.load();
    autorun(this.save);
  }

  private save = () =>
    window.localStorage.setItem(
      RepairWidData.name,
      JSON.stringify({
        repairWidgetLookup: this.repairWidgetLookup,
        repairDeliveryMethod: this.repairDeliveryMethod,
        repairsOfferedDevices: this.repairsOfferedDevices,
        apiDropOffDevices: this.apiDropOffDevices,
        receiveQuote: this.receiveQuote,
      })
    )

  @action
  private load = () =>
    Object.assign(this, JSON.parse(window.localStorage.getItem(RepairWidData.name) || '{}'))

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

}

export default new RepairWidData();