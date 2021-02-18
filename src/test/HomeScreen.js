import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import BackgroundTimer from 'react-native-background-timer';
import SplashScreen from 'react-native-splash-screen';

export const COMETCHAT_CREDS = {
  APP_ID: '23039f337feab7f',
  REGION: 'eu',
  AUTH_KEY: 'd25720f07e9066baceab459fb4ad6f95f749da8e',
  TOKEN:
    'fd61f233-070a-4a47-8110-b117f8ea099e_14570ed13bd98bf3bf599555e90758d516027b7c',
};

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  useKeepAwake();

  useEffect(() => {
    SplashScreen.hide();
    BackgroundTimer.start();
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      console.log('tic');
    }, 1000);
    return () => BackgroundTimer.clearInterval(intervalId);
  });

  useEffect(() => {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CREDS.REGION)
      .build();

    CometChat.init(COMETCHAT_CREDS.APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        CometChat.login(COMETCHAT_CREDS.TOKEN)
          .then((user) => {
            setLoading(false);
          })
          .catch((e) => console.log('error', e));
        // You can now call login function.
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text>Home Screen</Text>
          <Button title="Video" onPress={() => navigation.push('Video')} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
