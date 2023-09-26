import React, { useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import GlobalApi from '../Services/GlobalApi';

export default function ChatScreen() {
  const param = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hello, I'm ${param.selectedFace?.name}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.selectedFace?.image,
        },
      },
    ]);
  }, []);

  const getChatResp = async (msg) => {
    setLoading(true);

    try {
      const rsp = await GlobalApi.getBardApi(msg);

      const responseText = rsp.resp[1].content || "I apologize, I can't help";

      const apiRsp = {
        _id: Math.random() * (9999999 - 1),
        text: responseText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.selectedFace?.image,
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, apiRsp));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSend = useCallback((newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    if (newMessages[0].text) {
      getChatResp(newMessages[0].text);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
