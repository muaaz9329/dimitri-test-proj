import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
type Props = {
  data: OfferResponse[];
  loading?: boolean;
};

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../utils/colors';

const CourasalComponent = ({data, loading}: Props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  data = data.slice(0, 5);
  return (
    <SkeletonPlaceholder
      // highlightColor={colors.secondary}
      backgroundColor={colors.tertiary}
      enabled={loading}
      direction="left"
      borderRadius={10}>
      <Carousel
        loop
        width={width}
        height={height / 3}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1500}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.clickUrl);
            }}
            key={index}>
            <Image
              source={{uri: item.image}}
              style={{
                width: width,
                height: height / 3,
                // borderRadius: 10,
                //   margin: 20,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </SkeletonPlaceholder>
  );
};

CourasalComponent.defaultProps = {
  data: [],
  loading: true,
};

export default CourasalComponent;

const styles = StyleSheet.create({});
