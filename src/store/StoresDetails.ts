import { action, autorun, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class StoresDetails {

  @observable storesDetails: any = {};
  @observable findGeoLocation: any[] = [];
  @observable findAddLocation: any[] = [];
  @observable cntUserLocation: any[] = [];
  @observable cntUserLocationSelected: boolean = false;

  @observable store_id: number = 0;
  @observable location_id: number = 0;
  @observable is_voided: boolean = false;
  @observable customer_id: number = 1;
  @observable type: string = 'QUOTE'; /* type is 'QUOTE' or 'APPOINTMENT' */
  
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
        store_id: this.store_id,
        location_id: this.location_id,
        is_voided: this.is_voided,
        customer_id: this.customer_id,
        type: this.type,
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

  @action
  changeStoreID = (store_id: number) => {
    this.store_id = store_id
    this.save()
  }

  @action
  changeLocationID = (location_id: number) => {
    this.location_id = location_id
    this.save()
  }

  @action
  changeIsVoided = (is_voided: boolean) => {
    this.is_voided = is_voided
    this.save()
  }

  @action
  changeCustomerID = (customer_id: number) => {
    this.customer_id = customer_id
    this.save()
  }

  @action
  changeType = (type: string) => {
    this.type = type
    this.save()
  }

}

export default new StoresDetails();