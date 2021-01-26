import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class StoresDetails {

  @observable storesDetails: any = {};
  @observable findGeoLocation: any[] = [];
  @observable findAddLocation: any[] = [];

  constructor() {
    this.load();
    autorun(this.save);
  }

  private save = () =>
    window.localStorage.setItem(
      StoresDetails.name,
      JSON.stringify({
        storesDetails: this.storesDetails,
        findGeoLocation: this.findGeoLocation,
        findAddLocation: this.findAddLocation,
      })
    )

  @action
  private load = () =>
    Object.assign(this, JSON.parse(window.localStorage.getItem(StoresDetails.name) || '{}'))

  @action
  changestoresDetails = (storesDetails: any) => {
    this.storesDetails = storesDetails
    this.save()
  }

  @action
  changeFindGeoLocation = (findGeoLocation: any[]) => {
    this.findGeoLocation = findGeoLocation
    this.save()
  }

  @action
  changeFindAddLocation = (findAddLocation: any[]) => {
    this.findAddLocation = findAddLocation
    this.save()
  }

}

export default new StoresDetails();