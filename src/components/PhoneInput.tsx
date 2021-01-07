import React, {useState, useEffect} from "react";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

type Props = {
  placeholder?: string;
  handleSetPhone: (val:string) => void;
  val: string;
}

const PhoneInput = ({placeholder, handleSetPhone, val}: Props) => {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setPhone(val)
  }, [val])

  const handleOnChange = (value:string) => {
    setPhone(value);
    handleSetPhone(value);
  }

  return (
    <div>
      <ReactPhoneInput
        inputProps={{
          name: 'phone',
          required: true,
        }}
        country={'ca'}
        placeholder={placeholder}
        value={phone}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default PhoneInput
