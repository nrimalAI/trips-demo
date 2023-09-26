import { View, Text } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import GlobalApi from '../Services/GlobalApi';

  export default function ChatScreen() {
    const param = useRoute().params; 
    const [messages, setMessages] = useState([])
    const [selectedChatFaceData, setSelectedChatFaceData] = useState([]); 

    useEffect(() => {
        setSelectedChatFaceData(param.selectedFace)
      setMessages([
        {
          _id: 1,
          text: 'Hello, I\'m ' + param.selectedFace?.name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: param.selectedFace?.image,
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
      if(messages[0].text){
        getChatResp(messages[0].text)
      }
    }, [])

    const getChatResp=(msg)=>{
        GlobalApi.getBardApi(msg).then(rsp=>{
            if(rsp.resp[1].content){
               const apiRsp ={
                //_ Signifies variable is not being actively used or referenced
                // Math.random so keys will be unique
                _id: Math.random() * (9999999 - 1),
                text: rsp.resp[1].content,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: param.selectedFace?.image,
                }
              }
              setMessages(previousMessages => GiftedChat.append(previousMessages, apiRsp ))
            }
        }) 
    }
       
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    /> 
    </View>
  )
}