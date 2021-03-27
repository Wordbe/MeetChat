import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

import Colors from '../../constants/Colors';
import { ChatAppStackParamType } from '../../navigation/HomeStackNavigator';
import Loading from '../../component/Loading';

type HomeScreenPropType = {
  navigation: StackNavigationProp<ChatAppStackParamType, 'RoomScreen'>;
};

export type ThreadType = {
  _id: string;
  name: string;
};

const HomeScreen: React.FC<HomeScreenPropType> = props => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetch THREADS from firestore
    const unsubscribe = firestore()
      .collection('THREADS')
      .onSnapshot(querySnashot => {
        const _threads = querySnashot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data()
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
              description="Item description"
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
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
    fontSize: 16
  }
});

export default HomeScreen;
