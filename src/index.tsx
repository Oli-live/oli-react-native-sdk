import React from 'react';
import { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type OliSdkProps = {
  id: string;
};

export function OliSdk(props: OliSdkProps) {
  const [size, setSize] = useState({
    height: 210,
    width: 110,
  });

  const handleLayoutChange = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'pip') {
      setSize({
        height: 210,
        width: 110,
      });
    } else if (event.nativeEvent.data === 'full') {
      setSize({
        height: windowHeight,
        width: windowWidth,
      });
    }
  };

  const containerStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: size.width,
    height: size.height,
  };

  const webviewStyle: StyleProp<ViewStyle> = {
    height: size.height,
    width: size.width,
    backgroundColor: 'transparent',
  };

  return (
    <SafeAreaView style={containerStyle}>
      <WebView
        allowsInlineMediaPlayback
        originWhitelist={[
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        webviewDebuggingEnabled={true}
        scalesPageToFit={false}
        style={webviewStyle}
        onMessage={handleLayoutChange}
        source={{
          uri: `https://share.oli.video/webview/${
            props.id
          }?${new URLSearchParams(props)}`,
        }}
      />
    </SafeAreaView>
  );
}
