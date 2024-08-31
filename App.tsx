import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OfferWall from './src/screen/offerWall';

export default () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <OfferWall />
  </GestureHandlerRootView>
);
