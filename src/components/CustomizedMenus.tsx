import React, {useState} from 'react'
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import {Button} from '.'
import { useT } from "../i18n/index"
import {LangProps} from '../i18n/en'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"
import repairWidgetStore from "../store/RepairWidgetStore"
import { Link } from 'react-router-dom'

const StyledMenu = withStyles({
  paper: {
    borderRadius: '15px',
    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
    overflow: 'inherit',
    marginTop: '1px',
    paddingBottom: '15px'
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const useStyles = makeStyles(() =>
  createStyles({
    rootAddressDiv: {
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '180px', 
      backgroundColor: 'white',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.7
      }
    },
    addressButton: {
      fontSize: '15px', 
      border: 'none', 
      backgroundColor: 'white', 
      textDecoration: 'underline', 
      outline: 'none', 
      cursor: 'pointer', 
      padding: 0
    }
  }),
);

type Props = {
  subDomain?: string;
  btnTitle: LangProps;
  width: string;
  features: any[];
}

const CustomizedMenus = ({subDomain, btnTitle, width, features}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const themeColor = data.colorPalle.themeColor;
  const underLineCol = data.colorPalle.underLineCol;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const t = useT();
  const classes = useStyles();

  const [addStatus, setAddStatus] = useState(false);

  const handleAddress = () => {
    setAnchorEl(null);
    setAddStatus(true);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAddStatus(false);
  };

  const handleBookRepair = () => {
    repairWidgetStore.changeDeviceBrand([]);
    repairWidgetStore.changeDeviceModel([]);
    repairWidgetStore.changeChooseRepair([]);
    repairWidgetStore.changeDeviceCounter(0);
    repairWidgetStore.changeDeliveryMethod({});
    repairWidgetStore.changeReceiveQuote({});
    repairWidgetStore.changeContactDetails({});
    repairWidgetStore.changeBookData({ code: 'MI', data: {} });
    repairWidgetStore.changeBookData({ code: 'PU', data: {} });
    repairWidgetStore.changeBookData({ code: 'CU', data: {} });
    repairWidgetStore.changeBookData({ code: 'ON', data: {} });
    repairWidgetStore.changeMessage('');
    repairWidgetStore.changeCntStep(0);
  }

  return (
    <div>
      {(!addStatus) ? <Button 
        title={btnTitle} 
        bgcolor={themeColor} 
        borderR='20px'
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={true}
        fontSize='17px'
        width={width}
        subDomain={subDomain}
      /> : 
      <div style={{color: themeColor}} className={classes.rootAddressDiv} onClick={handleClick}>
        <RoomOutlinedIcon />
        <button style={{color: themeColor}} className={classes.addressButton} aria-controls='customized-menu' aria-haspopup='true'>
          71 Greenford Avenue
        </button>
      </div>}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={subDomain + '-triangle'}></div>
        <div className={subDomain + '-menu-content-div'}>
          <div className={subDomain + '-left-content'}>
            <div className={subDomain + '-content-block'}>
              <p className={subDomain + '-block-title'}>{t('MY_STORE')}</p>
              <p className={subDomain + '-block-content'} onClick={handleAddress}>71 Greenford Avenue Winninpeg, MB RiR 1R1 (204) 555-5555</p>
            </div>
            <div className={subDomain + '-content-block'}>
              <a className={subDomain + '-link'} style={{color: underLineCol}}>{t('VIEW_STORE_DETAILS')}</a>
              <a className={subDomain + '-link'} style={{color: underLineCol}}>{t('VIEW_MORE_STORES')}</a>
              <a className={subDomain + '-link'} style={{color: underLineCol}}>{t('GET_DIRECTIONS')}</a>
            </div>            
            <FeatureToggles features={features}>
              <Feature
                name='FEATURE_REPAIR'
                inactiveComponent={()=><></>}
                activeComponent={()=>
                  <Link to='/repair-widget' style={{textDecoration: 'none'}} onClick={handleBookRepair}>
                    <Button 
                      title='BOOK_REPAIR'
                      bgcolor={themeColor} 
                      borderR='20px' 
                      width='40px'
                      height='30px'
                      margin='0'
                      fontSize='15px'
                      subDomain={subDomain}
                    />
                  </Link>
                  
                }
              />
            </FeatureToggles>
          </div>
          <div style={{
            borderLeft: '2px solid rgba(0,0,0,0.25)', 
            margin: '30px 10px'
          }}></div>
          <div>
            <p className={subDomain + '-block-title'}>{t('HOURS')}</p>
            <div className={subDomain + '-hours-div'}>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className={subDomain + '-block-content'} key={index}>{t(item.day)}</p>
                  )
                })}
              </div>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className={subDomain + '-block-content'} key={index}>{t(item.time)}</p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <div className='menu-search-div'>
          <div className='menu-search'>
            <Search color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)' placeholder='FIND_ANOTHER_LOCATION'/>
          </div>
          <Button 
            title='SEARCH' 
            bgcolor={themeColor} 
            borderR='20px'
            width='100px'
            height='40px'
            margin='0 20px'
          />
        </div>*/}
      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;