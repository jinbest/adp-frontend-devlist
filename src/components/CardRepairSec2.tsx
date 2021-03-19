import React from "react"
import { GetDeviceUs, SelectRepair, ReceiveDevice } from "../pages/repair/Sec2-SVG"
import { storesDetails } from "../store"

type Props = {
  subtitle: string
  content?: string
  subDomain?: string
  type?: string
  children?: any
}

const CardRepairSec2 = ({ subtitle, content, subDomain, type, children }: Props) => {
  const data = storesDetails.storeCnts
  const sec2SvgCol = data.colorPalle.sec2SvgCol

  return (
    <div className={subDomain + "-card-repair-sec2"}>
      <div className={subDomain + "-card-repair-sec2-img"}>
        {type === "SelectRepair" && <SelectRepair color={sec2SvgCol} />}
        {type === "GetDeviceUs" && <GetDeviceUs color={sec2SvgCol} />}
        {type === "ReceiveDevice" && <ReceiveDevice color={sec2SvgCol} />}
      </div>
      <div>
        <p className={subDomain + "-card-repair-sec2-subtitle"}>{subtitle}</p>
        <p className={subDomain + "-card-repair-sec2-content"}>{children ? children : content}</p>
      </div>
    </div>
  )
}

CardRepairSec2.defaultProps = {
  subtitle: "Select a repair category",
  content: "Make an account with us and indicate what needs to be repaired.",
  img: "",
  subDomain: "geebo",
}

export default CardRepairSec2
