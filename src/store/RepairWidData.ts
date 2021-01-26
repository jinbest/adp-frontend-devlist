import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class RepairWidData {

  @observable repairWidgetLookup: any = {};
  @observable repairDeliveryMethod: any[] = [];

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

}

export default new RepairWidData();