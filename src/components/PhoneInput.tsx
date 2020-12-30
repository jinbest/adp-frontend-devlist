import React, {useState} from "react";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

type Props = {
  placeholder?: string;
}

const PhoneInput = ({placeholder}: Props) => {
  const [phone, setPhone] = useState('')

  const handleOnChange = (value:string) => {
    setPhone(value);
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
