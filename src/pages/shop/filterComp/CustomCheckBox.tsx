import React, {useState, useEffect} from 'react';

type Props = {
  subDomain?: string;
  options: any[];
}

export default function CustomCheckBox({subDomain, options}: Props) {
  const [checkOptions, setCheckOptions] = useState<boolean[]>([]);

  useEffect(() => {
    const cntCheckOptions: boolean[] = [];
    for (let i = 0; i < options.length; i++) {
      cntCheckOptions.push(false);
    }
    setCheckOptions([...cntCheckOptions]);
  }, [options])

  const handleChangeCheck = (idx: number) => {
    const cntCheckOptions: boolean[] = checkOptions;
    cntCheckOptions[idx] = !cntCheckOptions[idx];
    setCheckOptions([...cntCheckOptions]);
  }

  return (
    <div className={`${subDomain}-customized-checkbox`}>
      {options.map((item:any, index:number) => {
        return (
          <label className="container" key={index}>{item}
            <input type="checkbox" checked={checkOptions[index] || false} onChange={()=>{handleChangeCheck(index)}} />
            <span className="checkmark"></span>
          </label>
        )
      })}
    </div>
  );
}