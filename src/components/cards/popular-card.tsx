import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {widthPixel, WINDOW_WIDTH} from '../../utils/responsive-functions';
import colors from '../../utils/colors';
import {Poppins} from '../../utils/fonts';
import * as Progress from 'react-native-progress';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
type Props = {
  data: OfferResponse[];
  loading?: boolean;
};

function CardListingSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={colors.tertiary}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width={WINDOW_WIDTH}
        overflow="visible">
        <SkeletonPlaceholder.Item
          width={WINDOW_WIDTH / 2}
          height={widthPixel(210)}
          borderRadius={16}
          marginRight={widthPixel(10)}
        />
        <SkeletonPlaceholder.Item
          width={WINDOW_WIDTH / 2}
          height={widthPixel(210)}
          borderRadius={16}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

function CardComponent(props: {item: OfferResponse}) {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.item.clickUrl);
      }}
      style={styles.cardContainer}>
      <Image
        source={{
          uri: props.item.image,
        }}
        style={styles.HeaderImageStyles}
        resizeMode="cover"
      />
      <View style={styles.iconContainer}>
        <Image
          source={{
            uri: props.item.icon,
          }}
          style={styles.iconStyles}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.titleStyles}>
        {props.item.title.length > 14
          ? props.item.title.slice(0, 14) + '...'
          : props.item.title}
      </Text>
    </TouchableOpacity>
  );
}

const PopularCards = ({data, loading}: Props) => {
  data = [...data].sort((a, b) => a.popularity - b.popularity).slice(0, 5);
  return (
    <>
      {!loading && (
        <View style={styles.topContainer}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              minWidth: WINDOW_WIDTH * 2,
            }}
            renderItem={({item, index}) => <CardComponent item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      {loading && <CardListingSkeleton />}
    </>
  );
};

export default PopularCards;

const styles = StyleSheet.create({
  scoreStyles: {
    fontSize: widthPixel(10),
    color: colors.black,
    fontFamily: Poppins(600),
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: widthPixel(120),
  },
  titleStyles: {
    fontSize: widthPixel(16),
    color: colors.textSecondary,
    fontFamily: Poppins(700),
    textAlign: 'center',
  },
  iconStyles: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(12),
    borderWidth: 1,
    borderColor: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -widthPixel(20),
  },
  HeaderImageStyles: {
    width: '100%',
    height: widthPixel(150),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContainer: {
    width: WINDOW_WIDTH / 2,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: colors.secondary2,
  },
  topContainer: {
    width: '105%',
    overflow: 'hidden',
    minHeight: widthPixel(200),
    minWidth: WINDOW_WIDTH,
  },
});
