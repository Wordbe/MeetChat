import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { GiftedChat, IMessage, Bubble, Send } from 'react-native-gifted-chat';
import Colors from '../../constants/Colors';

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

  // 버블 렌더링 helper method
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.third
          }
        }}
        textStyle={{
          right: {
            color: 'white'
          }
        }}
      />
    );
  };

  // 보내기 버튼 생성하는 helper method
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color={Colors.primary} />
        </View>
      </Send>
    );
  };

  // 스크롤 맨 아래로 내리는 컴포넌트 생성하는 helper method
  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          icon="chevron-double-down"
          size={36}
          color={Colors.primary}
        />
      </View>
    );
  };

  // 채팅방 렌더링시 로딩 화면 생성하는 helper method
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.third} />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1, name: 'User1' }}
      renderBubble={renderBubble}
      showUserAvatar={true}
      renderSend={renderSend}
      scrollToBottom={true}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RoomScreen;
