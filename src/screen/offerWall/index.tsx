import React, {useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import CourasalComponent from '../../components/coursal/coursal-compoent';
import useOfferwall from './useOfferwall';
import {widthPixel} from '../../utils/responsive-functions';
import {ScrollView} from 'react-native-gesture-handler';
import CardContainer from '../../components/card-container/card-container';
import PopularCards from '../../components/cards/popular-card';
import colors from '../../utils/colors';
import {Poppins} from '../../utils/fonts';

const OfferWall = () => {
  const {data, loading} = useOfferwall();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <CourasalComponent data={data as OfferResponse[]} loading={loading} />
      <CardContainer>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: widthPixel(32),
            marginBottom: widthPixel(10),
            color: colors.primary,
            textAlign: 'center',
          }}>
          Offers
        </Text>
        <Text
          style={{
            fontFamily: Poppins(600),
            fontSize: widthPixel(20),
            marginBottom: widthPixel(10),
            color: colors.black,
          }}>
          Top Popular
        </Text>
        <PopularCards data={data as OfferResponse[]} loading={loading} />
        <Text
          style={{
            fontFamily: Poppins(600),
            fontSize: widthPixel(20),
            marginBottom: widthPixel(10),
            color: colors.black,
            marginTop: widthPixel(20),
          }}>
          New Offers
        </Text>
      </CardContainer>
    </ScrollView>
  );
};

export default OfferWall;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});
