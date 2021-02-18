import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';

const VideoScreen = () => {
  let sessionID = 'SESSION_ID';
  let audioOnly = false;
  let deafaultLayout = true;
  let callListener = new CometChat.OngoingCallListener({
    onCallEnded: (call) => {
      console.log('Call ended:', call);
    },
    onError: (error) => {
      console.log('Call Error: ', error);
    },
  });

  let callSettings = new CometChat.CallSettingsBuilder()
    .enableDefaultLayout(deafaultLayout)
    .setSessionID(sessionID)
    .setIsAudioOnlyCall(audioOnly)
    .setCallEventListener(callListener)
    .build();

  return (
    <View style={{height: '100%', width: '100%', position: 'relative'}}>
      <CometChat.CallingComponent callsettings={callSettings} />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
