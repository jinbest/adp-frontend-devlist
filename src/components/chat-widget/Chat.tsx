import React, {useEffect} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import support_logo from './resources/support_logo.png';
import {useT} from '../../i18n/index';

import queryMessage from './firebase-connection.js';

type Props = {
  subDomain?: string;
}

const Chat = ({subDomain}: Props) => {
  const mainData = require(`../../assets/${subDomain}/Database.js`);
  const logoHeaderImg = require(`../../assets/${subDomain}/img/logo/logo-header.png`);
  const chatImg = require(`../../assets/${subDomain}/img/chat.png`);
  const chatBgCol = mainData.colorPalle.chatBgCol;

  const t = useT();

  useEffect(() => {
    const timer = setTimeout(() => {
      addResponseMessage('Hi! Welcome to visit our website. 😊');
      addResponseMessage('Have any questions? I\'m very happy to help you. 😀');
    }, 3000);
    return () => clearTimeout(timer);
  }, [subDomain]);

  const handleNewUserMessage = (newMessage:string) => {
    queryMessage(newMessage);
  };

  const getCustomLauncher = (handleToggle:any) =>
    <div className='chat-container' style={{backgroundColor: chatBgCol}} onClick={handleToggle}>
      <img src={chatImg.default} />
    </div>

  return (
    <div className='chat-widget-container'>
      <Widget 
        titleAvatar={logoHeaderImg.default}
        profileAvatar={support_logo}
        title=""
        subtitle={t("WE_TYPICALLY_REPLY_IN_FEW_MINS")}
        handleNewUserMessage={handleNewUserMessage}
        toggleWidget="true"
        // launcher={(handleToggle:any) => getCustomLauncher(handleToggle)}
      />
    </div>
  )
}

Chat.defaultProps = {
  subDomain: 'devicelist'
}

export default Chat;
