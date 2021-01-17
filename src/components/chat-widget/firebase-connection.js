import { addResponseMessage } from "react-chat-widget";
const ChatOption = require('./chatOption.js');
const { queryWit, firstEntity } = require("./wit-ai.js");
// const firebase = require("firebase");
//firebase.database.enableLogging(true);

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyDPISooK2_Hd7bSTT_65pWY7Pf5SfpbPg8",
//     authDomain: "pmdchatbot-malay-pilot.firebaseapp.com",
//     databaseURL: "https://pmdchatbot-malay-pilot.firebaseio.com/"
//   });
// }

function queryMessage(question) {
  console.log("Message Received: " + question);

  queryWit(question).then(({ entities }) => {
    const intent = firstEntity(entities, "intent");
    const intentValue = (intent && intent.value) || "unknown";

    console.log("Intent Detected: " + intentValue);

    // bugs to-be settled: intents not availble on firebase"
    // what if firebase returns null
    // clean the code, try and catch
    /*if (intentValue === "unknown") {
      addResponseMessage("I don't know");
    } else {
      firebase
        .database()
        .ref(`${intentValue}`)
        .once("value")
        .then((snapshot) => {
          const message = snapshot.val();
          console.log("message: " + message);
          if (message === null) {
            addResponseMessage("Answer not in database");
          } else {
            addResponseMessage(message);
          }
        });
    } */

    let responseStatus = false;
    const lowerQuestion = question.toLowerCase(), 
      hey = ChatOption.hey,
      greeting = ChatOption.greeting,
      thankyou = ChatOption.thankyou,
      emotion = ChatOption.emotion;

    for (let i = 0; i < hey.length; i++) {
      if (lowerQuestion.includes(hey[i])) {
        addResponseMessage("Hi, Friend!");
        responseStatus = true;
        break;
      }
    }

    for (let i = 0; i < greeting.length; i++) {
      if (lowerQuestion.includes(greeting[i][0]) && lowerQuestion.includes(greeting[i][1])) {
        addResponseMessage("Nice to meet you, too. 🙂");
        responseStatus = true;
        break;
      }
    }

    for (let i = 0; i < thankyou.length; i++) {
      if (lowerQuestion.includes(thankyou[i])) {
        addResponseMessage("You are welcome!");
        responseStatus = true;
        break;
      }
    }

    for (let i = 0; i < emotion.length; i++) {
      if (lowerQuestion.includes(emotion[i])) {
        addResponseMessage("🙂");
        responseStatus = true;
        break;
      }
    }

    if (!responseStatus) {
      addResponseMessage("I don't know!");
    }   

  });
}

export default queryMessage;
