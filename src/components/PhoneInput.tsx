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
  const [phone, setPhone] = useState("")

  useEffect(() => {
    setPhone(val)
  }, [val])

  const handleOnChange = (value: string) => {
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
