import React, { useEffect, useState } from "react"
import { Widget, addResponseMessage } from "react-chat-widget"
import "react-chat-widget/lib/styles.css"
import support_logo from "./resources/support_logo.png"
import { useTranslation } from "react-i18next"
import { FeatureToggles, Feature } from "@paralleldrive/react-feature-toggles"

import queryMessage from "./firebase-connection.js"

type Props = {
  subDomain?: string
  features: any[]
}

const Chat = ({ subDomain, features }: Props) => {
  // const mainData = require(`../../assets/${subDomain}/Database.js`);
  // const chatData = mainData.chatData;
  // const chatBgCol = mainData.colorPalle.chatBgCol;

  const [t] = useTranslation()
  const [feats, setFeatures] = useState<any[]>([])

  useEffect(() => {
    setFeatures([])
    for (let i = 0; i < features.length; i++) {
      if (features[i].flag === "FRONTEND_CHAT" && features[i].isActive) {
        setFeatures(["FRONTEND_CHAT"])
      }
    }
  }, [features])

  useEffect(() => {
    const timer = setTimeout(() => {
      addResponseMessage("Hi! Welcome to visit our website. 😊")
      addResponseMessage("Have any questions? I'm very happy to help you. 😀")
    }, 3000)
    return () => clearTimeout(timer)
  }, [subDomain])

  const handleNewUserMessage = (newMessage: string) => {
    queryMessage(newMessage)
  }

  // const getCustomLauncher = (handleToggle:any) =>
  //   <div className={subDomain + '-chat-container'} style={{backgroundColor: chatBgCol}} onClick={handleToggle}>
  //     <img src={chatData.chatImg} />
  //   </div>

  return (
    <div className={subDomain + "-chat-widget-container"}>
      <FeatureToggles features={feats}>
        <Feature
          name="FRONTEND_CHAT"
          inactiveComponent={() => <></>}
          activeComponent={() => (
            <Widget
              titleAvatar={
                require(`../../assets/${subDomain}/img/logo/banana-logo-header.png`).default
              }
              profileAvatar={support_logo}
              title=""
              subtitle={t("We typically reply in a few minutes")}
              handleNewUserMessage={handleNewUserMessage}
              toggleWidget="true"
              // launcher={(handleToggle:any) => getCustomLauncher(handleToggle)}
            />
          )}
        />
      </FeatureToggles>
    </div>
  )
}

Chat.defaultProps = {
  subDomain: "devicelist",
}

export default Chat
