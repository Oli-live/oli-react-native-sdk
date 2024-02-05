import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type OliSdkProps = {
  id: string;
};

export function OliSdk(props: OliSdkProps) {
  const [storage, setStorage] = useState<any>(null);
  const [size, setSize] = useState({
    height: 210,
    width: 110,
  });
  const [origin, setOrigin] = useState([
    'http://*',
    'https://*',
    'intent://*',
    'tel:*',
    'mailto:*',
  ]);
  const [webviewStyle, setWebviewStyle] = useState<any>({
    height: 210,
    width: 110,
    backgroundColor: 'transparent',
  });
  const [containerStyle, setContainerStyle] = useState<any>({
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 210,
    width: 110,
    zIndex: 2147483647,
  });

  const handleLayoutChange = (event: WebViewMessageEvent) => {
    let newSize = size;
    if (event.nativeEvent.data === 'pip') {
      newSize = size;
    } else if (event.nativeEvent.data === 'full') {
      newSize = {
        height: windowHeight,
        width: windowWidth,
      };
    }
    setWebviewStyle({
      ...webviewStyle,
      ...newSize,
    });
    setContainerStyle({
      ...containerStyle,
      ...newSize,
    });
  };

  const getInitialData = useCallback(async () => {
    const data: any = await fetch(
      `https://api.oli.services/oli-api/config/${props.id}`
    );
    const response = await data.json();
    if (response?.configs?.origin?.length) {
      setOrigin(response?.configs?.origin);
    }
    if (response?.configs?.webviewStyle) {
      setWebviewStyle(response?.configs?.webviewStyle);
      setSize({
        height: response?.configs?.webviewStyle?.height,
        width: response?.configs?.webviewStyle?.width,
      });
    }
    if (response?.configs?.containerStyle) {
      setContainerStyle(response?.configs?.containerStyle);
    }
  }, [props.id]);

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      if (result) setStorage(result);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <SafeAreaView style={containerStyle}>
      <WebView
        allowsInlineMediaPlayback
        originWhitelist={origin}
        webviewDebuggingEnabled={true}
        scalesPageToFit={false}
        style={webviewStyle}
        onMessage={handleLayoutChange}
        source={{
          uri: `https://share.oli.video/webview/${
            props.id
          }?${new URLSearchParams({ ...storage, ...props })}`,
        }}
      />
    </SafeAreaView>
  );
}
