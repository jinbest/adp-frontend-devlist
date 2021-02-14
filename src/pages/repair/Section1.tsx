import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Button } from '../../components'
import { Link } from 'react-router-dom'
import { inject, IWrappedComponent, observer } from 'mobx-react'
import { RepairWidgetStore } from '../../store/RepairWidgetStore'
import { T } from '../../i18n/index'

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
    const cntAppointment: any = repairWidgetStore.appointResponse;
    repairWidgetStore.init();
    repairWidgetStore.changeAppointResponse(cntAppointment);
    handleStatus(false);
  }

  render() {
    const { subDomain } = this.props;
    const data = require(`../../assets/${subDomain}/Database`);
    const repair = data.repairData.section1;
    // const t = useT();
    
    return (
      <div className={subDomain + '-repair-section1-special-bg'}>
        <section className={subDomain + '-Container'}>
          <Grid container className={subDomain + '-repair-section1'}>
            <Grid item xs={12} sm={7}>
              <Typography className={subDomain + "-repair-section-title-1"} style={{color: repair.themeCol}}>
                <T id={repair.title} />
              </Typography>
              <Typography className={subDomain + "-repair-section-content"} style={{color: repair.themeCol}}>
                <T id={repair.content} />
              </Typography>
              <Box className={subDomain + '-repair-section-button'}>
                <Link to='/get-quote' style={{textDecoration: 'none'}} onClick={this.handleRepairWidget}>
                  <Button 
                    // title={repair.btnTitle} 
                    title='Get Quote'
                    bgcolor={data.colorPalle.repairButtonCol} 
                    borderR='20px'
                    subDomain={subDomain}
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
