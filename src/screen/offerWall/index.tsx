import React, {useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import CourasalComponent from '../../components/coursal/coursal-compoent';
import useOfferwall from './useOfferwall';

const OfferWall = () => {
  const width = Dimensions.get('window').width;
  const {data, loading} = useOfferwall();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CourasalComponent data={data as OfferResponse[]} loading={loading} />
    </View>
  );
};

export default OfferWall;
