import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { GiftedChat, IMessage, Bubble, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import Colors from '../../constants/Colors';
import { AuthContext } from '../../navigation/AuthProvider';

const defaultMessages: IMessage[] = [
  // 기본 chat message
  {
    _id: '1',
    text: 'Meet Chat 에 오신 것을 환영합니다',
    createdAt: new Date().getTime(),
    user: {
      _id: '2',
      name: 'Meet Chat'
    }
  },
  // 기본 system message
  {
    _id: '0',
    text: '새로운 채팅방이 생성되었습니다.',
    createdAt: new Date().getTime(),
    system: true,
    user: { _id: '', name: 'system' }
  }
];

const RoomScreen = ({ route }: any) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { aUser } = useContext(AuthContext);
  const currentUser = aUser;
  const { thread } = route.params;

  // 메시지를 전송해주는 helper method
  const handleSend = async (newMessage: IMessage[] = []) => {
    const text = newMessage[0].text;

    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser?.uid,
          name: currentUser?.email
        }
      });

    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  };

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const querySnapshotMessages = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          const data: IMessage = {
            _id: doc.id,
            createdAt: docData.createdAt,
            text: docData.text,
            user: {
              _id: docData.user._id,
              name: docData.user.email
            },
            system: docData.system
          };

          return data;
        });

        setMessages([...querySnapshotMessages, ...defaultMessages]);
      });

    return () => messagesListener();
  }, []);

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
      onSend={handleSend}
      user={{ _id: currentUser?.uid ? currentUser.uid : '0' }}
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
