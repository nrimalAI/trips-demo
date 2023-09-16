import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatFaceData from '../Services/ChatFaceData';

export default function HomeScreen() {
    const [chatFaceData, setChatFaceData] = useState(); 
    const [selectedChatFaceData, setSelectedChatFaceData] = useState();

    useEffect(() => {
        setChatFaceData(ChatFaceData);
        setSelectedChatFaceData(ChatFaceData[0])

    }, [])
  return ( 
     <View>
      <Text style={[{color:selectedChatFaceData.primary}]}>Hey</Text>
      <Text>Hey I'm {selectedChatFaceData.name}</Text>

    </View>
  )
} 