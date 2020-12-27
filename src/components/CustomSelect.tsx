import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: '20px'
    },
  }),
);

type Props = {
  subDomain?: string;
  options: any[];
}

const CustomSelect = ({options}: Props) => {
  // const data = require(`../assets/${subDomain}/Database`);

  const classes = useStyles();
  const [option, setOption] = React.useState(options[0]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOption(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.root} variant="outlined">
        <Select
          value={option}
          onChange={handleChange}
        >
          {options.map((item:any, index:number) => {
            return (
              <MenuItem value={item} key={index}>{item}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomSelect
