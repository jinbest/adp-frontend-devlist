import React from "react";

type Props = {
  subDomain?: string;
  options: any[];
  title: string;
}

const SortbyDropdown = ({subDomain, options, title}:Props) => {
  return (
    <div className={`${subDomain}-select`}>
      <select name="slct" id="slct" defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>{title}</option>
        {options.map((item:any, index:number) => {
          return (
            <option value={item} key={index}>{item}</option>
          )
        })}
      </select>
    </div>
  )
}

export default SortbyDropdown