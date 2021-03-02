import React, { useState, useEffect } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
    },
  })
)

type Props = {
  subDomain?: string
  options: any[]
  value: any
  handleSetValue: (val: any) => void
  variant?: "filled" | "outlined" | "standard" | undefined
}

const CustomSelect = ({ options, value, handleSetValue, subDomain, variant }: Props) => {
  // const data = require(`../assets/${subDomain}/Database`);

  const classes = useStyles()

  const [state, setState] = useState<{ code: string; name: string }>({
    code: value.code,
    name: value.name,
  })

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof state
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  useEffect(() => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].code === state.code) {
        handleSetValue(options[i])
      }
    }
  }, [state])

  useEffect(() => {
    setState({ code: value.code, name: value.name })
  }, [value])

  return (
    <div>
      <FormControl
        className={classes.root}
        variant={variant ?? "outlined"}
        disabled={options.length === 0}
      >
        <Select
          value={state.code}
          onChange={handleChange}
          inputProps={{
            name: "code",
          }}
          className={subDomain + "-custom-select"}
        >
          {options.map((item: any, index: number) => {
            return (
              <MenuItem className={subDomain + "-custom-select"} value={item.code} key={index}>
                {item.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default CustomSelect
