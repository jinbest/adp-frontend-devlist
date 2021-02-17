import React, {useState, useEffect} from "react"
import {
    ChooseDevice,
    BackSVG,
    ContactDetails,
    BookTime,
    UsefulInfo,
    RepairServiceSummary,
    QuoteComponent,
    Error
} from "./widget-comp"
import { inject, observer } from "mobx-react"
import { RepairWidgetStore } from "./store/RepairWidgetStore"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import { getRepairLookupAPI, getDeliveryMethodsAPI } from "./service/RepairWidgetCallAPI"
import { storesDetails } from "./store"
import { repairMockData, colorPalle } from "./mock-data/mockData"

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
  repWidgetStore: RepairWidgetStore
}
interface Props extends StoreProps {
  subDomain: string
  handleStatus: (status: boolean) => void
  features: any[]
}

const RepairWidget = inject("repWidgetStore")(
  observer((props: Props) => {
    const { subDomain, handleStatus, features, repWidgetStore } = props;
    const themeCol = colorPalle[subDomain].themeColor;
    const [step, setStep] = useState(0);
    const [feats, setFeats] = useState<any[]>([]);

    useEffect(() => {
      handleStatus(false);
      setStep(repWidgetStore.cntStep)
      document.title = "Quotes | " + storesDetails.storesDetails.name

      const cntFeatures: any[] = []
      for (let i = 0; i < features.length; i++) {
        if (features[i].isActive) {
          cntFeatures.push(features[i].flag)
        }
      }
      setFeats([...cntFeatures])

      repWidgetStore.changeRepairWidgetInitialValue({
        selectDate: new Date().toISOString().split("T")[0],
        selected_start_time: new Date().getDay() === 0 ? "10:00" : "09:00",
        selected_end_time: new Date().getDay() === 0 ? "16:00" : "17:30",
      })

      getRepairLookupAPI()
      getDeliveryMethodsAPI()

    }, [])

    const handleBackStep = () => {
      const  cntStep: number = step,
        cntDeviceBrand = repWidgetStore.deviceBrand,
        cntDeviceModel = repWidgetStore.deviceModel,
        cntChooseRepair = repWidgetStore.chooseRepair,
        cntDeviceCounter = repWidgetStore.deviceCounter

      switch (cntStep) {
        case 1:
          if (cntDeviceBrand.length === cntDeviceCounter && cntDeviceCounter > 0)
            cntDeviceBrand.pop()
          if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0)
            cntDeviceModel.pop()
            repWidgetStore.changeDeviceBrand(cntDeviceBrand)
            repWidgetStore.changeDeviceModel(cntDeviceModel)
            repWidgetStore.changeDeviceCounter(cntDeviceCounter - 1)
          break
        case 2:
          if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0)
            cntDeviceModel.pop()
          if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0)
            cntChooseRepair.pop()
          repWidgetStore.changeDeviceModel(cntDeviceModel)
          repWidgetStore.changeChooseRepair(cntChooseRepair)
          break
        case 3:
          if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0)
            cntChooseRepair.pop()
          repWidgetStore.changeChooseRepair(cntChooseRepair)
          break
        case 4:
          repWidgetStore.changeDeliveryMethod({})
          break
        case 5:
          repWidgetStore.changeDeliveryMethod({})
          repWidgetStore.changeReceiveQuote({})
          break
        case 6:
          repWidgetStore.changeReceiveQuote({})
          repWidgetStore.changeContactDetails({})
          break
        case 7:
          repWidgetStore.changeContactDetails({})
          repWidgetStore.changeBookData({ code: "MAIL_IN", data: {} })
          repWidgetStore.changeBookData({ code: "WALK_IN", data: {} })
          repWidgetStore.changeBookData({ code: "PICK_UP", data: {} })
          repWidgetStore.changeBookData({ code: "CURBSIDE", data: {} })
          repWidgetStore.changeBookData({ code: "ONSITE", data: {} })
          break
        case 8:
          repWidgetStore.changeBookData({ code: "MAIL_IN", data: {} })
          repWidgetStore.changeBookData({ code: "WALK_IN", data: {} })
          repWidgetStore.changeBookData({ code: "PICK_UP", data: {} })
          repWidgetStore.changeBookData({ code: "CURBSIDE", data: {} })
          repWidgetStore.changeBookData({ code: "ONSITE", data: {} })
          repWidgetStore.changeMessage("")
          break
        case 9:
          repWidgetStore.changeMessage("")
          break
        default:
          break
      }
      if (cntStep === 11) {
        if (repWidgetStore.deliveryMethod.code === "MAIL_IN") {
          repWidgetStore.changeCntStep(9)
          setStep(9)
        } else {
          repWidgetStore.changeContactDetails({})
          repWidgetStore.changeCntStep(6)
          setStep(6)
        }
      } else {
        repWidgetStore.changeCntStep(cntStep - 1)
        setStep(cntStep - 1)
      }
    }

    const handleStep = (i: number) => {
      setStep(i)
      repWidgetStore.changeCntStep(i)
    }

    const handleChangeChooseData = (i: number, chooseData: any) => {
      if (i === 0) {
        const cntDeviceBrand = repWidgetStore.deviceBrand,
          cntDeviceCounter = repWidgetStore.deviceCounter
        cntDeviceBrand.push(chooseData)
        repWidgetStore.changeDeviceBrand(cntDeviceBrand)
        repWidgetStore.changeDeviceCounter(cntDeviceCounter + 1)
      } else if (i === 1) {
        const cntDeviceModel = repWidgetStore.deviceModel
        cntDeviceModel.push(chooseData)
        repWidgetStore.changeDeviceModel(cntDeviceModel)
      } else if (i === 2) {
        const cntChooseRepair = repWidgetStore.chooseRepair
        const counter = chooseData.counter
        if (cntChooseRepair.length >= counter) {
            cntChooseRepair[counter - 1] = chooseData.data
        } else {
            cntChooseRepair.push(chooseData.data)
        }
        repWidgetStore.changeChooseRepair(cntChooseRepair)
      } else if (i === 4) {
        repWidgetStore.changeDeliveryMethod(chooseData)
      } else if (i === 5) {
        repWidgetStore.changeReceiveQuote(chooseData)
      } else if (i === 6) {
        repWidgetStore.changeContactDetails(chooseData)
      } else if (i === 7) {
        repWidgetStore.changeBookData(chooseData)
      } else if (i === 8) {
        repWidgetStore.changeMessage(chooseData)
      }
    }

    const handleDeviceCounterBack = () => {
      setStep(3)
    }

    return (
      <FeatureToggles features={feats}>
        <Feature
            name="FRONTEND_REPAIR"
            inactiveComponent={() => <Error />}
            activeComponent={() => (
                <div className={subDomain + "-repair-widget " + subDomain + "-Container"}>
                    {repWidgetStore.deviceCounter > 0 && 
                        <div
                            className={subDomain + "-back-to-top"}
                            onClick={handleDeviceCounterBack}
                        >
                            <BackSVG color="#BDBFC3" />
                        </div>
                    }
                    {step > 0 && step < 10 && (
                        <div
                            className={subDomain + "-back-to-top"}
                            onClick={handleBackStep}
                        >
                            <BackSVG color="#BDBFC3" />
                        </div>
                    )}
                    {step <= 5 && (
                        <ChooseDevice
                            data={repairMockData[stepList[step]]}
                            handleStep={handleStep}
                            handleChangeChooseData={handleChangeChooseData}
                            stepName={stepList[step]}
                            step={step}
                            subDomain={subDomain}
                            repairWidgetData={repWidgetStore}
                            features={feats}
                        />
                    )}
                    {step === 6 && (
                        <ContactDetails
                            data={repairMockData[stepList[step]]}
                            subDomain={subDomain}
                            step={step}
                            handleStep={handleStep}
                            handleChangeChooseData={handleChangeChooseData}
                            repairWidgetData={repWidgetStore}
                            code={repWidgetStore.deliveryMethod.code}
                            features={feats}
                        />
                    )}
                    {step === 7 && (
                        <BookTime
                            data={repairMockData[stepList[step]]}
                            subDomain={subDomain}
                            step={step}
                            code={repWidgetStore.deliveryMethod.code}
                            handleStep={handleStep}
                            handleChangeChooseData={handleChangeChooseData}
                            repairWidgetData={repWidgetStore}
                        />
                    )}
                    {step === 8 && (
                        <UsefulInfo
                            data={repairMockData[stepList[step]]}
                            subDomain={subDomain}
                            step={step}
                            handleStep={handleStep}
                            handleChangeChooseData={handleChangeChooseData}
                            repairWidgetData={repWidgetStore}
                        />
                    )}
                    {step === 9 && (
                        <RepairServiceSummary
                            themeCol={themeCol}
                            repairWidgetData={repWidgetStore}
                            code={repWidgetStore.deliveryMethod.code}
                            step={step}
                            handleStep={handleStep}
                            subDomain={subDomain}
                            features={feats}
                        />
                    )}
                    {step === 10 && (
                        <QuoteComponent
                            data={repairMockData[stepList[step]]}
                            repairWidgetData={repWidgetStore}
                            quoteKey={1}
                            subDomain={subDomain}
                        />
                    )}
                    {step === 11 && (
                        <QuoteComponent
                            data={repairMockData[stepList[10]]}
                            repairWidgetData={repWidgetStore}
                            quoteKey={0}
                            subDomain={subDomain}
                        />
                    )}
                </div>
            )}
        />
    </FeatureToggles>
    )
  }))

export default RepairWidget

