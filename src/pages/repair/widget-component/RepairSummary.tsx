import React from "react"
import { Typography } from "@material-ui/core"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import { inject, IWrappedComponent, observer } from "mobx-react"
import { RepairWidgetStore } from "../../../store/RepairWidgetStore"
import { T } from "../../../i18n/index"
import { ConvertWarrantyUnit } from "./ChooseDevice"

type StoreProps = {
  repairWidgetStore: RepairWidgetStore
}
interface Props extends StoreProps {
  step: number
  themeCol: string
  subDomain?: string
  showInfo?: boolean
}

type MyState = {
  brand: any[]
  model: any[]
  choose: any[]
  counter: number
}
@inject("repairWidgetStore")
@observer
class RepairSummary extends React.Component<Props, MyState> {
  static defaultProps = {} as StoreProps

  constructor(props: Props) {
    super(props)
    this.state = {
      brand: [],
      model: [],
      choose: [],
      counter: 0,
    }
    this.handleTrashSummary = this.handleTrashSummary.bind(this)
  }

  componentDidMount() {
    const { repairWidgetStore } = this.props
    this.setState({
      brand: repairWidgetStore.deviceBrand,
      model: repairWidgetStore.deviceModel,
      choose: repairWidgetStore.chooseRepair,
      counter: repairWidgetStore.deviceCounter,
    })
  }

  handleTrashSummary(countNum: number, serviceNum: number) {
    const { repairWidgetStore } = this.props
    const cntDeviceBrand = repairWidgetStore.deviceBrand,
      cntDeviceModel = repairWidgetStore.deviceModel,
      cntChooseRepair = repairWidgetStore.chooseRepair
    let cntDeviceCounter = repairWidgetStore.deviceCounter
    cntChooseRepair[countNum].splice(serviceNum, 1)
    if (cntChooseRepair[countNum].length === 0) {
      cntChooseRepair.splice(countNum, 1)
      cntDeviceBrand.splice(countNum, 1)
      cntDeviceModel.splice(countNum, 1)
      cntDeviceCounter = cntDeviceCounter - 1
      repairWidgetStore.changeDeviceBrand(cntDeviceBrand)
      repairWidgetStore.changeDeviceModel(cntDeviceModel)
      repairWidgetStore.changeChooseRepair(cntChooseRepair)
      repairWidgetStore.changeDeviceCounter(cntDeviceCounter)
      this.setState({
        brand: cntDeviceBrand,
        model: cntDeviceModel,
        choose: cntChooseRepair,
        counter: cntDeviceCounter,
      })
    } else {
      repairWidgetStore.changeChooseRepair(cntChooseRepair)
      this.setState({
        choose: cntChooseRepair,
      })
    }
  }

  render() {
    const { themeCol, subDomain, showInfo, repairWidgetStore } = this.props
    // const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/service-widget/device-model/iPhone-whole.png`);
    const mockData = require(`../../../assets/${subDomain}/mock-data/mockData.js`)
    const code = repairWidgetStore.deliveryMethod.code
    const publicText = mockData.repairWidget.publicText

    return (
      <div className={subDomain + "-service-choose-device-container"}>
        <Typography className={subDomain + "-topic-title"}>
          <T id={publicText.repairServiceSummary} />
        </Typography>
        <div className={subDomain + "-repair-summary-content-div"}>
          {this.state.brand &&
            this.state.brand.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {this.state.choose[index] &&
                    this.state.choose[index].map((chooseItem: any, chooseIndex: number) => (
                      <div key={chooseIndex} className={subDomain + "-repair-summary-div"}>
                        <DeleteOutlineOutlinedIcon
                          className={subDomain + "-repair-trash-icon"}
                          style={{ color: themeCol }}
                          onClick={() => {
                            this.handleTrashSummary(index, chooseIndex)
                          }}
                        />
                        <div className={subDomain + "-repair-summary-img"}>
                          <img src={item.img} />
                        </div>
                        <div>
                          <Typography className={subDomain + "-repair-summary-title"}>
                            {/* {this.state.model[index]["name"]
                              .toString()
                              .includes(item.name.toString())
                              ? this.state.model[index]["name"]
                              : item.name + " " + this.state.model[index]["name"]} */}
                            {this.state.model[index]["name"]}
                          </Typography>
                          {/* <Typography className={subDomain + "-repair-summary-service"}>
                            <T id={publicText.repairService} />
                          </Typography> */}
                          <p className={subDomain + "-repair-summary-service-child"}>
                            <T id={chooseItem.name} />
                          </p>
                          <p className={subDomain + "-repair-summary-service-child"}>
                            <T id={chooseItem.estimate} />
                          </p>
                          {chooseItem.warranty && chooseItem.warranty > 0 ? (
                            <p className={subDomain + "-repair-summary-service-child"}>
                              {"Warranty: " +
                                chooseItem.warranty +
                                " " +
                                ConvertWarrantyUnit(chooseItem.warranty_unit, chooseItem.warranty)}
                            </p>
                          ) : chooseItem.warranty && chooseItem.warranty === -1 ? (
                            <p className={subDomain + "-repair-summary-service-child"}>
                              Warranty: Lifetime
                            </p>
                          ) : (
                            <p
                              className={subDomain + "-repair-summary-service-child"}
                              style={{ color: "grey" }}
                            >
                              <i>No warranty</i>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              )
            })}
          {showInfo && (
            <div className={subDomain + "-repair-summary-div"}>
              <div>
                <Typography className={subDomain + "-repair-summary-title"}>
                  <T id={repairWidgetStore.deliveryMethod.method} />
                </Typography>
                {code === "PICK_UP" && (
                  <Typography className={subDomain + "-repair-summary-service"}>
                    <T id="PICK_UP_FROM" />
                  </Typography>
                )}
                {code === "MAIL_IN" && (
                  <Typography className={subDomain + "-repair-summary-service"}>
                    <T id="SEND_TO" />
                  </Typography>
                )}
                {code !== "MAIL_IN" && (
                  <p className={subDomain + "-repair-summary-service-child"}>
                    <T id={repairWidgetStore.bookData[code].address.name} />
                  </p>
                )}
                {code === "MAIL_IN" && (
                  <p
                    className={subDomain + "-repair-summary-service-child"}
                    style={{ marginBottom: "15px" }}
                  >
                    <T id={repairWidgetStore.bookData[code].sendTo} />
                  </p>
                )}
                {code === "MAIL_IN" && (
                  <Typography className={subDomain + "-repair-summary-service"}>
                    <T id="RETURN_TO" />
                  </Typography>
                )}
                {code === "MAIL_IN" && (
                  <p className={subDomain + "-repair-summary-service-child"}>
                    <T id={repairWidgetStore.contactDetails.address1.name} />
                  </p>
                )}
                {code !== "MAIL_IN" && (
                  <p className={subDomain + "-repair-summary-service-child"}>
                    {repairWidgetStore.bookData[code].week +
                      ", " +
                      repairWidgetStore.bookData[code].month +
                      " " +
                      repairWidgetStore.bookData[code].day +
                      ", " +
                      repairWidgetStore.bookData[code].year +
                      " at " +
                      repairWidgetStore.bookData[code].time}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default RepairSummary as typeof RepairSummary & IWrappedComponent<Props>
