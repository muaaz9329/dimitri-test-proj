import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthPixel} from '../../utils/responsive-functions';
import colors from '../../utils/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
type Props = {
  children?: React.ReactNode;
};

const CardContainer = ({children}: Props) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

export default CardContainer;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: width,
    position: 'relative',
    top: widthPixel(-28),
    minHeight: (height / 3) * 2 + widthPixel(28),
    borderTopLeftRadius: widthPixel(20),
    borderTopRightRadius: widthPixel(20),
    backgroundColor: colors.secondary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    paddingVertical: widthPixel(24),
    paddingHorizontal: widthPixel(16),
  },
});
