import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class StoresDetails {

  @observable storesDetails: any = {};
  @observable findGeoLocation: any[] = [];
  @observable findAddLocation: any[] = [];
  @observable cntUserLocation: any[] = [];
  @observable cntUserLocationSelected: boolean = false;

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
        cntUserLocation: this.cntUserLocation,
        cntUserLocationSelected: this.cntUserLocationSelected,
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

  @action
  changeCntUserLocation = (cntUserLocation: any[]) => {
    this.cntUserLocation = cntUserLocation
    this.save()
  }

  @action
  changeCntUserLocationSelected = (cntUserLocationSelected: boolean) => {
    this.cntUserLocationSelected = cntUserLocationSelected
    this.save()
  }

}

export default new StoresDetails();