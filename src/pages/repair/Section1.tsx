import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Button } from '../../components'
import { Link } from 'react-router-dom'
import { inject, IWrappedComponent, observer } from 'mobx-react'
import { RepairWidgetStore } from '../../store/RepairWidgetStore'

/* eslint-disable */
type StoreProps = {  
  repairWidgetStore: RepairWidgetStore;
}
interface Props extends StoreProps {
  subDomain: string;
  handleStatus: (status:boolean) => void;
}
@inject('repairWidgetStore')
@observer
class Section1 extends React.Component<Props> {
  static defaultProps = {} as StoreProps;

  constructor(props:Props) {
    super(props);
    this.handleRepairWidget = this.handleRepairWidget.bind(this);
  }

  handleRepairWidget() {
    const { handleStatus, repairWidgetStore } = this.props;
    repairWidgetStore.changeDeviceBrand([]);
    repairWidgetStore.changeDeviceModel([]);
    repairWidgetStore.changeChooseRepair([]);
    repairWidgetStore.changeDeviceCounter(0);
    repairWidgetStore.changeDeliveryMethod({});
    repairWidgetStore.changeReceiveQuote({});
    repairWidgetStore.changeContactDetails({});
    for (let i = 0; i < 4; i++) {
      repairWidgetStore.changeBookData({ caseKey: i, data: {} });
    }
    repairWidgetStore.changeMessage('');
    repairWidgetStore.changeCntStep(0);
    handleStatus(false);
  }

  render() {
    const { subDomain } = this.props;
    const data = require(`../../assets/${subDomain}/Database`);
    const repair = data.repairData.section1;

    return (
      <div className='repair-section1-special-bg'>
        <section className='Container'>
          <Grid container className='repair-section1'>
            <Grid item xs={12} sm={7}>
              <Typography className="repair-section-title-1" style={{color: repair.themeCol}}>
                {repair.title}
              </Typography>
              <Typography className="repair-section-content" style={{color: repair.themeCol}}>
                {repair.content}
              </Typography>
              <Box className='repair-section-button'>
                <Link to='/repair-widget' style={{textDecoration: 'none'}} onClick={this.handleRepairWidget}>
                  <Button 
                    title={repair.btnTitle} 
                    bgcolor={data.colorPalle.themeColor} 
                    borderR='20px'
                  />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <img src={repair.img} style={{width: '100%', marginTop: '-80px'}}/>
            </Grid>
          </Grid>
        </section>
      </div>
    )
  }
}

export default Section1 as typeof Section1 & IWrappedComponent<Props>;
