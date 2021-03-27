import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import HomeStackNavigator from './HomeStackNavigator';
import { AuthContext } from './AuthProvider';
import Loading from '../component/Loading';

const Routes: React.FC = () => {
  const { aUser, setAuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // aUser 상태변화를 핸들링한다.
  const onAuthStateChanged = (aUser: any) => {
    setAuser?.(aUser);
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {aUser ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
