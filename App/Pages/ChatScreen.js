import { View, Text } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat   } from 'react-native-gifted-chat';

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
    }, [])
       
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