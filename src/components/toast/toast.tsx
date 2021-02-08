import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { FunctionComponent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ToastMsgParams } from "./toast-msg-params"

interface ToastProps {
  params: ToastMsgParams
  resetStatuses: () => void
}

type AlertSeverity = "success" | "info" | "error" | "warning"

const Toast: FunctionComponent<ToastProps> = ({ params, resetStatuses }) => {
  const [t] = useTranslation()
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  useEffect(() => {
    const { msg, isError, isSuccess, isInfo, isWarning } = params
    setAlertMsg(msg ? msg : "")

    if ((isError || isSuccess || isInfo || isWarning) && !openAlert) {
      setOpenAlert(true)
    }
  }, [params])

  const setSeverity = (): AlertSeverity => {
    const { isError, isSuccess, isInfo, isWarning } = params
    let severity: AlertSeverity = "info"

    if (isError) {
      severity = "error"
    } else if (isSuccess) {
      severity = "success"
    } else if (isWarning) {
      severity = "warning"
    } else if (isInfo) {
      severity = "info"
    }

    return severity
  }

  const closeAlert = () => {
    setOpenAlert(false)
    setAlertMsg("")
    resetStatuses()
  }

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={closeAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={closeAlert} severity={setSeverity()}>
          {t(alertMsg)}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Toast
