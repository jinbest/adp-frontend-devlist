import React, { useState, useEffect } from "react"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

type Props = {
  placeholder?: string
  handleSetPhone: (val: string) => void
  val: string
  errorText?: string
}

const PhoneInput = ({ placeholder, handleSetPhone, val, errorText }: Props) => {
  const [phone, setPhone] = useState("+1")

  useEffect(() => {
    if (val.length < 2) {
      setPhone("+1")
      handleSetPhone("+1")
    }
    setPhone(val)
  }, [val])

  const handleOnChange = (value: string) => {
    if (value.length < 2) {
      setPhone("+1")
      handleSetPhone("+1")
    }
    setPhone(value)
    handleSetPhone(value)
  }

  return (
    <div>
      <ReactPhoneInput
        inputProps={{
          name: "phone",
          required: true,
        }}
        country={"ca"}
        onlyCountries={["ca", "us"]}
        // enableAreaCodes={true}
        placeholder={placeholder}
        value={phone}
        onChange={handleOnChange}
        inputClass={errorText ? "error-phone-input" : ""}
        buttonClass={errorText ? "error-phone-input" : ""}
      />
      {errorText && (
        <span style={{ color: "red", fontSize: "13px", marginLeft: "20px" }}>{errorText}</span>
      )}
    </div>
  )
}

export default PhoneInput
