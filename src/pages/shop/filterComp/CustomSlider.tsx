import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const createDynamicMuiTheme = (col: string) => {
  return createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb:{
          color: col || '#3880ff',
        },
        track: {
          color: col || '#3880ff'
        }
      }
    },
  });
};

const useStyles = makeStyles({
  root: {
    width: 150,
    marginLeft: '10px'
  },
});

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

function valuetext(value: number) {
  return `$${value}`;
}

const IOSSlider = withStyles({
  root: {
    height: 4,
    padding: '25px 0',
  },
  thumb: {
    height: 14,
    width: 14,
    boxShadow: iOSBoxShadow,
    marginTop: -7,
    marginLeft: -7,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 2px)',
    top: -15,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

type Props = {
  col: string;
}

export default function CustomSlider({col}: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([0, 1100]);

  const handleChange = (event: any, newValue: number | number[]) => {
    event.preventDefault();
    setValue(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={createDynamicMuiTheme(col)}>
        <IOSSlider getAriaLabel={valuetext} value={value} min={0} max={1100} valueLabelDisplay="on" onChange={handleChange} valueLabelFormat={valuetext} />
      </ThemeProvider>
    </div>
  );
}