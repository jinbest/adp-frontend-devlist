import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import {Button, Search} from '.'

/* eslint-disable */

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
}

const CustomizedMenus = ({subDomain}: Props) => {
  const data = require(`../assets/${subDomain}/Database`);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        title='Find a Store' 
        bgcolor='#054DFA' 
        borderR='20px'
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={true}
        fontSize='17px'
        width='150px'
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
              <p className='block-title'>MY STORE</p>
              <p className='block-content'>71 Greenford Avenue Winninpeg, MB RiR 1R1 (204) 555-5555</p>
            </div>
            <div className='content-block'>
              <a className='link'>View Store Details</a>
              <a className='link'>Get Directions</a>
            </div>
            <Button 
              title='Book Repair' 
              bgcolor='#054DFA' 
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
            <p className='block-title'>HOURS</p>
            <div className='hours-div'>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className='block-content' key={index}>{item.day}</p>
                  )
                })}
              </div>
              <div>
                {data.hoursData.map((item:any, index:number) => {
                  return (
                    <p className='block-content' key={index}>{item.time}</p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='menu-search-div'>
          <div className='menu-search'>
            <Search color='rgba(0,0,0,0.8)' bgcolor='white' border='rgba(0,0,0,0.2)'/>
          </div>
          <Button 
            title='Search' 
            bgcolor='#054DFA' 
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