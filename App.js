/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

function App() {
  const [link, setLink] = useState('');

  async function buildLink() {
    const link = await dynamicLinks().buildShortLink(
      {
        link: 'https://goit.ua/proekty/',
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://webinardeeplinking.page.link',
        android: {
          packageName: 'com.webinardeeplinking',
          fallbackUrl: 'https://goit.ua/',
        },
        ios: {
          bundleId: 'org.reactjs.native.example.webinarDeepLinking',
          appStoreId: '123456789',
          fallbackUrl: 'https://goit.ua/',
        },
      },
      'SHORT',
    );

    return link;
  }

  const handleDynamicLink = (link) => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://goit.ua/proekty/') {
      // ...navigate to your offers screen
      console.log('open');
    }
  };

  const generateInvite = async () => {
    const url = await buildLink();
    setLink(url);
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the is component unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        handleDynamicLink(link);
      });
  }, []);

  useEffect(() => {
    generateInvite();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>{link}</Text>
        <TextInput value={link} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
