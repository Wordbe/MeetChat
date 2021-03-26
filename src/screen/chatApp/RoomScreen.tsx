import React, { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const RoomScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
      user: { _id: '' }
    },
    // example of chat message
    {
      _id: 1,
      text: 'Meet Chat 에 오신 것을 환영합니다',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Meet Chat'
      }
    }
  ]);

  // 메시지를 전송해주는 helper method
  const handleSend = (newMessage: IMessage[] = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
  );
};

export default RoomScreen;
