import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { FilterComponent } from './'

const useStyles = makeStyles({
  drawer: {
    display: 'none',
    top: 0,
    position: 'absolute',
    right: 0,
    width: 200,
    padding: '120px 20px 20px',
    zIndex: 2,
    background: 'white',
    ['@media (max-width:960px)']: {
      display: 'block',
    }
  }
});

type Props = {
  subDomain?: string;
  open: boolean;
}

const RightDrawer = ({subDomain, open}: Props) => {
  const classes = useStyles();

  return (
    <Slide direction="down" in={open} timeout={500} mountOnEnter unmountOnExit>
      <div className={classes.drawer}>
        <FilterComponent subDomain={subDomain} />
      </div>
    </Slide>
  );
}

export default RightDrawer