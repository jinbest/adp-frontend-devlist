import React from 'react'
import { Typography } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { inject, IWrappedComponent, observer } from 'mobx-react'
import { RepairWidgetStore } from '../../../store/RepairWidgetStore'

/* eslint-disable */
type StoreProps = {  
  repairWidgetStore: RepairWidgetStore;
}
interface Props extends StoreProps {
  step: number;
  themeCol: string;
  subDomain?: string;
  showInfo?: boolean;
}

type MyState = {
  brand: any[];
  model: any[];
  choose: any[];
  counter: number;
}
@inject('repairWidgetStore')
@observer 
class RepairSummary extends React.Component<Props, MyState> {
  static defaultProps = {} as StoreProps;

  constructor(props:Props) {
    super(props);
    this.state = {
      brand: [],
      model: [],
      choose: [],
      counter: 0
    }
    this.handleTrashSummary = this.handleTrashSummary.bind(this);
  }

  componentDidMount() {
    const { repairWidgetStore } = this.props;
    this.setState({
      brand: repairWidgetStore.deviceBrand,
      model: repairWidgetStore.deviceModel,
      choose: repairWidgetStore.chooseRepair,
      counter: repairWidgetStore.deviceCounter
    });
  }

  handleTrashSummary(countNum:number, serviceNum:number) {
    const { repairWidgetStore } = this.props;
    let cntDeviceBrand = repairWidgetStore.deviceBrand,
      cntDeviceModel = repairWidgetStore.deviceModel,
      cntChooseRepair = repairWidgetStore.chooseRepair,
      cntDeviceCounter= repairWidgetStore.deviceCounter;
    cntChooseRepair[countNum].splice(serviceNum, 1);
    if (cntChooseRepair[countNum].length === 0) {
      cntChooseRepair.splice(countNum, 1);
      cntDeviceBrand.splice(countNum, 1);
      cntDeviceModel.splice(countNum, 1);
      cntDeviceCounter = cntDeviceCounter - 1;
      repairWidgetStore.changeDeviceBrand(cntDeviceBrand);
      repairWidgetStore.changeDeviceModel(cntDeviceModel);
      repairWidgetStore.changeChooseRepair(cntChooseRepair);
      repairWidgetStore.changeDeviceCounter(cntDeviceCounter);
      this.setState({
        brand: cntDeviceBrand,
        model: cntDeviceModel,
        choose: cntChooseRepair,
        counter: cntDeviceCounter
      })
    } else {
      repairWidgetStore.changeChooseRepair(cntChooseRepair);
      this.setState({
        choose: cntChooseRepair
      });
    }
  }

  render() {
    const { themeCol, subDomain, showInfo, repairWidgetStore } = this.props;
    const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`);
    const caseKey = repairWidgetStore.deliveryMethod.caseKey;

    return (
      <div className='repair-choose-device-container'>
        <Typography className='topic-title'>Repair summary</Typography>
        <div className='repair-summary-content-div'>
          {this.state.brand && this.state.brand.map((item:any, index:number) => {
            return (
              <React.Fragment key={index}>
                {this.state.choose[index] && this.state.choose[index].map((chooseItem:any, chooseIndex:number) => (
                  <div key={chooseIndex} className='repair-summary-div'>
                    <DeleteOutlineOutlinedIcon 
                      className='repair-trash-icon' 
                      style={{color: themeCol}}
                      onClick={()=>{this.handleTrashSummary(index, chooseIndex)}}
                    />
                    <div className='repair-summary-img'><img src={iPhoneWhole.default} /></div>
                    <div>
                      <Typography className='repair-summary-title'>
                        {item.name + ' ' + this.state.model[index]['name']}
                      </Typography>
                      <Typography className='repair-summary-service'>Repair Service:</Typography>
                      <p className='repair-summary-service-child'>{chooseItem.name}</p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )
          })}
          {showInfo && <div className='repair-summary-div'>
            <div>
              <Typography className='repair-summary-title'>{repairWidgetStore.deliveryMethod.method}</Typography>
              {caseKey === 1 && <Typography className='repair-summary-service'>Pick Up From</Typography>}
              {caseKey === 0 && <Typography className='repair-summary-service'>Send To</Typography>}
              {caseKey > 0 && <p className='repair-summary-service-child'>{repairWidgetStore.bookData[caseKey].address}</p>}
              {caseKey === 0 && <p className='repair-summary-service-child' style={{marginBottom: '15px'}}>{repairWidgetStore.bookData[caseKey].sendTo}</p>}
              {caseKey === 0 && <Typography className='repair-summary-service'>Return To</Typography>}
              {caseKey === 0 && <p className='repair-summary-service-child'>
                {repairWidgetStore.contactDetails.address1}
              </p>}
              {caseKey > 0 && <p className='repair-summary-service-child'>
                {
                  repairWidgetStore.bookData[caseKey].week + ', ' + 
                  repairWidgetStore.bookData[caseKey].month + ' ' + 
                  repairWidgetStore.bookData[caseKey].day + ', ' + 
                  repairWidgetStore.bookData[caseKey].year + ' at ' + 
                  repairWidgetStore.bookData[caseKey].time
                }
              </p>}
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default RepairSummary as typeof RepairSummary & IWrappedComponent<Props>;