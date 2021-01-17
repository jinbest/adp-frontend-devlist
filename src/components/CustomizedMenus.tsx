import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import {Button, Search} from '.'
import { useT } from "../i18n/index"
import {LangProps} from '../i18n/en'

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

type Props = {
  subDomain?: string;
  btnTitle: LangProps;
  width: string;
}

const CustomizedMenus = ({subDomain, btnTitle, width}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const themeColor = data.colorPalle.themeColor;
  const underLineCol = data.colorPalle.underLineCol;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const t = useT();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        title={btnTitle} 
        bgcolor={themeColor} 
        borderR='20px'
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={true}
        fontSize='17px'
        width={width}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className='triangle'></div>
        <div className='menu-content-div'>
          <div className='left-content'>
            <div className='content-block'>
              <p className='block-title'>{t('MY_STORE')}</p>
              <p className='block-content'>71 Greenford Avenue Winninpeg, MB RiR 1R1 (204) 555-5555</p>
            </div>
            <div className='content-block'>
              <a className='link' style={{color: underLineCol}}>View Store Details</a>
              <a className='link' style={{color: underLineCol}}>Get Directions</a>
            </div>
            <Button 
              title='BOOK_REPAIR'
              bgcolor={themeColor} 
              borderR='20px' 
              width='40px'
              height='30px'
              margin='0'
              fontSize='15px'
            />
          </div>
          <div style={{
            borderLeft: '2px solid rgba(0,0,0,0.25)', 
            margin: '30px 10px'
          }}></div>
          <div>
            <p className='block-title'>{t('HOURS')}</p>
            <div className='hours-div'>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className='block-content' key={index}>{t(item.day)}</p>
                  )
                })}
              </div>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className='block-content' key={index}>{t(item.time)}</p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='menu-search-div'>
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
        </div>               
      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;