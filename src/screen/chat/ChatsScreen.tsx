import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import { List, Divider } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

import Colors from '../../constants/Colors';
import { ChatAppStackParamType } from '../../navigation/ChatStackNavigator';
import Loading from '../../component/Loading';

type HomeScreenPropType = {
  navigation: StackNavigationProp<ChatAppStackParamType, 'RoomScreen'>;
};

export type ThreadType = {
  _id: string;
  name: string;
  latestMessage: {
    createdAt: number;
    text: string;
  };
};

const listRight = (time: number) => {
  const newDate = new Date(time);
  const month = newDate.getMonth();
  const date = newDate.getDate();
  let hours = newDate.getHours().toString();
  let minutes = newDate.getMinutes().toString();

  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;

  return (
    <Text
      style={styles.listRightText}
    >{`${month}월 ${date}일 ${hours}:${minutes}`}</Text>
  );
};

const HomeScreen: React.FC<HomeScreenPropType> = props => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetch THREADS from firestore
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnashot => {
        const _threads = querySnashot.docs.map(documentSnapshot => {
          const docData = documentSnapshot.data();
          return {
            _id: documentSnapshot.id,
            name: docData.name,
            latestMessage: {
              createdAt: docData.latestMessage.createdAt,
              text: docData.latestMessage.text
            }
          };
        });
        setThreads(_threads);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Icon name="chat" size={40} color={Colors.third} />
      </View>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RoomScreen', { thread: item })
            }
          >
            <List.Item
              title={item.name}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              description={item.latestMessage.text}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              right={() => listRight(item.latestMessage.createdAt)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    flex: 1
  },
  head: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 14
  },
  listRightText: {
    marginTop: 10,
    fontSize: 12,
    color: '#363F42'
  }
});

export default HomeScreen;
