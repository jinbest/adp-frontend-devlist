import React from "react"
import {
  ChooseDevice,
  BackSVG,
  ContactDetails,
  BookTime,
  UsefulInfo,
  RepairServiceSummary,
  QuoteComponent,
} from "./widget-component"
import { inject, IWrappedComponent, observer } from "mobx-react"
import { RepairWidgetStore } from "../../store/RepairWidgetStore"
import { computed } from "mobx"
import { Error } from "../error"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { getRepairLookupAPI, getDeliveryMethodsAPI } from "./RepairWidgetCallAPI"
import { storesDetails } from "../../store"
import { Helmet } from "react-helmet"

const stepList: string[] = [
  "deviceBrand",
  "deviceModel",
  "deviceRepairs",
  "repairAnotherDevice",
  "dropOffDevicce",
  "receiveQuote",
  "contactDetails",
  "bookTime",
  "usefulInfo",
  "repairServiceSummary",
  "quoteData",
]

type StoreProps = {
  repairWidgetStore: RepairWidgetStore
}
interface Props extends StoreProps {
  subDomain: string
  handleStatus: (status: boolean) => void
  features: any[]
}

type MyState = {
  step: number
  feats: any[]
  pageTitle: string
}

@inject("repairWidgetStore")
@observer
class RepairWidget extends React.Component<Props, MyState> {
  static defaultProps = {} as StoreProps

  @computed
  get computedRepairWidgetData() {
    const cntRepairWidgetData = this.props.repairWidgetStore
    return {
      deviceBrand: cntRepairWidgetData.deviceBrand,
      deviceModel: cntRepairWidgetData.deviceModel,
      chooseRepair: cntRepairWidgetData.chooseRepair,
      deviceCounter: cntRepairWidgetData.deviceCounter,
      deliveryMethod: cntRepairWidgetData.deliveryMethod,
      receiveQuote: cntRepairWidgetData.receiveQuote,
      contactDetails: cntRepairWidgetData.contactDetails,
      bookData: cntRepairWidgetData.bookData,
      message: cntRepairWidgetData.message,
      cntStep: cntRepairWidgetData.cntStep,
      appointResponse: cntRepairWidgetData.appointResponse,
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      step: 0,
      feats: [],
      pageTitle: "Quotes | ",
    }
    this.handleBackStep = this.handleBackStep.bind(this)
    this.handleDeviceCounterBack = this.handleDeviceCounterBack.bind(this)
    this.handleChangeChooseData = this.handleChangeChooseData.bind(this)
  }

  componentDidMount() {
    const { handleStatus, repairWidgetStore, features } = this.props
    handleStatus(false)
    this.setState({
      step: repairWidgetStore.cntStep,
      pageTitle: "Quotes | " + storesDetails.storesDetails.name,
    })

    const cntFeatures: any[] = []
    for (let i = 0; i < features.length; i++) {
      if (features[i].isActive) {
        cntFeatures.push(features[i].flag)
      }
    }
    this.setState({ feats: cntFeatures })

    repairWidgetStore.changeRepairWidgetInitialValue({
      selectDate: new Date().toISOString().split("T")[0],
      selected_start_time: new Date().getDay() === 0 ? "10:00" : "09:00",
      selected_end_time: new Date().getDay() === 0 ? "16:00" : "17:30",
    })

    getRepairLookupAPI()
    getDeliveryMethodsAPI()
  }

  handleBackStep() {
    const { repairWidgetStore } = this.props,
      cntStep: number = this.state.step
    const cntDeviceBrand = repairWidgetStore.deviceBrand,
      cntDeviceModel = repairWidgetStore.deviceModel,
      cntChooseRepair = repairWidgetStore.chooseRepair
    const cntDeviceCounter = repairWidgetStore.deviceCounter

    switch (cntStep) {
      case 1:
        if (cntDeviceBrand.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceBrand.pop()
        if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceModel.pop()
        repairWidgetStore.changeDeviceBrand(cntDeviceBrand)
        repairWidgetStore.changeDeviceModel(cntDeviceModel)
        repairWidgetStore.changeDeviceCounter(cntDeviceCounter - 1)
        break
      case 2:
        if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceModel.pop()
        if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0)
          cntChooseRepair.pop()
        repairWidgetStore.changeDeviceModel(cntDeviceModel)
        repairWidgetStore.changeChooseRepair(cntChooseRepair)
        break
      case 3:
        if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0)
          cntChooseRepair.pop()
        repairWidgetStore.changeChooseRepair(cntChooseRepair)
        break
      case 4:
        repairWidgetStore.changeDeliveryMethod({})
        break
      case 5:
        repairWidgetStore.changeDeliveryMethod({})
        repairWidgetStore.changeReceiveQuote({})
        break
      case 6:
        repairWidgetStore.changeReceiveQuote({})
        repairWidgetStore.changeContactDetails({})
        break
      case 7:
        repairWidgetStore.changeContactDetails({})
        repairWidgetStore.changeBookData({ code: "MAIL_IN", data: {} })
        repairWidgetStore.changeBookData({ code: "WALK_IN", data: {} })
        repairWidgetStore.changeBookData({ code: "PICK_UP", data: {} })
        repairWidgetStore.changeBookData({ code: "CURBSIDE", data: {} })
        repairWidgetStore.changeBookData({ code: "ONSITE", data: {} })
        break
      case 8:
        repairWidgetStore.changeBookData({ code: "MAIL_IN", data: {} })
        repairWidgetStore.changeBookData({ code: "WALK_IN", data: {} })
        repairWidgetStore.changeBookData({ code: "PICK_UP", data: {} })
        repairWidgetStore.changeBookData({ code: "CURBSIDE", data: {} })
        repairWidgetStore.changeBookData({ code: "ONSITE", data: {} })
        repairWidgetStore.changeMessage("")
        break
      case 9:
        repairWidgetStore.changeMessage("")
        break
      default:
        break
    }
    if (cntStep === 11) {
      if (repairWidgetStore.deliveryMethod.code === "MAIL_IN") {
        repairWidgetStore.changeCntStep(9)
        this.setState({ step: 9 })
      } else {
        repairWidgetStore.changeContactDetails({})
        repairWidgetStore.changeCntStep(6)
        this.setState({ step: 6 })
      }
    } else {
      repairWidgetStore.changeCntStep(cntStep - 1)
      this.setState({ step: cntStep - 1 })
    }
  }

  handleStep(i: number) {
    const { repairWidgetStore } = this.props
    this.setState({ step: i })
    repairWidgetStore.changeCntStep(i)
  }

  handleChangeChooseData(i: number, chooseData: any) {
    const { repairWidgetStore } = this.props
    if (i === 0) {
      const cntDeviceBrand = repairWidgetStore.deviceBrand,
        cntDeviceCounter = repairWidgetStore.deviceCounter
      cntDeviceBrand.push(chooseData)
      repairWidgetStore.changeDeviceBrand(cntDeviceBrand)
      repairWidgetStore.changeDeviceCounter(cntDeviceCounter + 1)
    } else if (i === 1) {
      const cntDeviceModel = repairWidgetStore.deviceModel
      cntDeviceModel.push(chooseData)
      repairWidgetStore.changeDeviceModel(cntDeviceModel)
    } else if (i === 2) {
      const cntChooseRepair = repairWidgetStore.chooseRepair
      const counter = chooseData.counter
      if (cntChooseRepair.length >= counter) {
        cntChooseRepair[counter - 1] = chooseData.data
      } else {
        cntChooseRepair.push(chooseData.data)
      }
      repairWidgetStore.changeChooseRepair(cntChooseRepair)
    } else if (i === 4) {
      repairWidgetStore.changeDeliveryMethod(chooseData)
    } else if (i === 5) {
      repairWidgetStore.changeReceiveQuote(chooseData)
    } else if (i === 6) {
      repairWidgetStore.changeContactDetails(chooseData)
    } else if (i === 7) {
      repairWidgetStore.changeBookData(chooseData)
    } else if (i === 8) {
      repairWidgetStore.changeMessage(chooseData)
    }
  }

  handleDeviceCounterBack() {
    // const { repairWidgetStore } = this.props;
    // repairWidgetStore.changeDeviceCounter(this.computedRepairWidgetData.deviceCounter-1);
    this.handleStep(3)
  }

  render() {
    const { subDomain } = this.props
    const mockData = require(`../../assets/${subDomain}/mock-data/mockData.js`)
    const mainData = require(`../../assets/${subDomain}/Database.js`)
    const themeCol = mainData.colorPalle.themeColor

    return (
      <>
        <Helmet>
          <title>{this.state.pageTitle}</title>
          <meta name="description" content={""} />
        </Helmet>
        <FeatureToggles features={this.state.feats}>
          <Feature
            name="FRONTEND_REPAIR"
            inactiveComponent={() => <Error />}
            activeComponent={() => (
              <div className={subDomain + "-repair-widget " + subDomain + "-Container"}>
                {this.computedRepairWidgetData.deviceCounter > 0 && this.state.step < 10 && (
                  <div
                    className={subDomain + "-back-to-top"}
                    onClick={this.handleDeviceCounterBack}
                  >
                    <BackSVG color="#BDBFC3" />
                  </div>
                )}
                {this.state.step > 0 && this.state.step < 10 && (
                  <div className={subDomain + "-back-to-top"} onClick={this.handleBackStep}>
                    <BackSVG color="#BDBFC3" />
                  </div>
                )}
                {this.state.step <= 5 && (
                  <ChooseDevice
                    // data={this.state.step === 4 ? repairWidData.repairWidgetLookup : mockData.repairWidget[stepList[this.state.step]]}
                    data={mockData.repairWidget[stepList[this.state.step]]}
                    handleStep={this.handleStep.bind(this)}
                    handleChangeChooseData={this.handleChangeChooseData.bind(this)}
                    stepName={stepList[this.state.step]}
                    step={this.state.step}
                    subDomain={subDomain}
                    repairWidgetData={this.computedRepairWidgetData}
                    features={this.state.feats}
                  />
                )}
                {this.state.step === 6 && (
                  <ContactDetails
                    data={mockData.repairWidget[stepList[this.state.step]]}
                    subDomain={subDomain}
                    step={this.state.step}
                    handleStep={this.handleStep.bind(this)}
                    handleChangeChooseData={this.handleChangeChooseData.bind(this)}
                    repairWidgetData={this.computedRepairWidgetData}
                    code={this.computedRepairWidgetData.deliveryMethod.code}
                    features={this.state.feats}
                  />
                )}
                {this.state.step === 7 && (
                  <BookTime
                    data={mockData.repairWidget[stepList[this.state.step]]}
                    subDomain={subDomain}
                    step={this.state.step}
                    code={this.computedRepairWidgetData.deliveryMethod.code}
                    handleStep={this.handleStep.bind(this)}
                    handleChangeChooseData={this.handleChangeChooseData.bind(this)}
                    repairWidgetData={this.computedRepairWidgetData}
                  />
                )}
                {this.state.step === 8 && (
                  <UsefulInfo
                    data={mockData.repairWidget[stepList[this.state.step]]}
                    subDomain={subDomain}
                    step={this.state.step}
                    handleStep={this.handleStep.bind(this)}
                    handleChangeChooseData={this.handleChangeChooseData.bind(this)}
                    repairWidgetData={this.computedRepairWidgetData}
                  />
                )}
                {this.state.step === 9 && (
                  <RepairServiceSummary
                    themeCol={themeCol}
                    repairWidgetData={this.computedRepairWidgetData}
                    code={this.computedRepairWidgetData.deliveryMethod.code}
                    step={this.state.step}
                    handleStep={this.handleStep.bind(this)}
                    subDomain={subDomain}
                    features={this.state.feats}
                  />
                )}
                {this.state.step === 10 && (
                  <QuoteComponent
                    data={mockData.repairWidget[stepList[this.state.step]]}
                    repairWidgetData={this.computedRepairWidgetData}
                    quoteKey={1}
                    subDomain={subDomain}
                  />
                )}
                {this.state.step === 11 && (
                  <QuoteComponent
                    data={mockData.repairWidget[stepList[10]]}
                    repairWidgetData={this.computedRepairWidgetData}
                    quoteKey={0}
                    subDomain={subDomain}
                  />
                )}
              </div>
            )}
          />
        </FeatureToggles>
      </>
    )
  }
}

export default RepairWidget as typeof RepairWidget & IWrappedComponent<Props>
