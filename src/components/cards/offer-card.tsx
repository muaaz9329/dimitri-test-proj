import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Collapsible from 'react-native-collapsible';
import {widthPixel} from '../../utils/responsive-functions';
import {Poppins} from '../../utils/fonts';
import colors from '../../utils/colors';
import * as lodash from 'lodash';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as Progress from 'react-native-progress';
type Props = {
  data: OfferResponse[];
  loading?: boolean;
};

function CardSkeleton() {
  return (
    <SkeletonPlaceholder backgroundColor={colors.tertiary} borderRadius={10}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" padding={10}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={25} />
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item width={100} height={20} />
            <SkeletonPlaceholder.Item width={50} marginTop={10} height={15} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          marginTop={10}
          flexDirection="row"
          padding={10}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={25} />
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item width={100} height={20} />
            <SkeletonPlaceholder.Item width={50} marginTop={10} height={15} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

function CardComponent(props: {item: OfferResponse}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setCollapsed(!collapsed);
      }}>
      <View style={styles.gameInfoCont}>
        <Image
          source={{
            uri: props.item.image,
          }}
          style={styles.imgStyles}
        />
        <View>
          <Text style={styles.titleStyles}>{props.item?.title}</Text>
          <Progress.Bar
            progress={0.5}
            width={widthPixel(100)}
            color={colors.primary}
            unfilledColor={colors.secondary}
            height={widthPixel(5)}
            style={{marginTop: widthPixel(5), marginLeft: widthPixel(10)}}
          />
        </View>
      </View>
      <Collapsible
        collapsed={collapsed} // collapsedHeight={100}
        style={{
          marginTop: widthPixel(5),
        }}>
        {props.item?.instructions.map((text, index) => (
          <View key={index} style={styles.challengeContainer}>
            <Text style={styles.challengeTitle}>
              {lodash.unescape(text.split('{C}')[0]?.trim())}
            </Text>
            {text.split('{C}')[1]?.length > 0 && (
              <View style={styles.challengeScoreContainer}>
                <Text style={styles.scoreTextStyles}>
                  {lodash.unescape(text.split('{C}')[1]?.trim())}
                </Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.mainBtnContainer}
          onPress={() => {
            Linking.openURL(props.item.clickUrl);
          }}>
          <Text style={styles.mainBtnTextStyles}>Play Game Now</Text>
        </TouchableOpacity>
      </Collapsible>
    </TouchableOpacity>
  );
}

const OfferCard = ({data, loading}: Props) => {
  return (
    <>
      {!loading && (
        <ScrollView style={{flex: 1}}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <CardComponent item={item} />}
          />
        </ScrollView>
      )}
      {loading && <CardSkeleton />}
    </>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  mainBtnTextStyles: {
    fontFamily: Poppins(500),
    fontSize: widthPixel(12),
    color: colors.white,
  },
  mainBtnContainer: {
    paddingVertical: widthPixel(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthPixel(5),
    marginBottom: widthPixel(10),
    borderRadius: widthPixel(45),
    backgroundColor: colors.primary,
  },
  scoreTextStyles: {
    fontFamily: Poppins(500),
    fontSize: widthPixel(10),
    lineHeight: widthPixel(12),
    color: colors.white,
  },
  challengeScoreContainer: {
    paddingHorizontal: widthPixel(10),
    paddingVertical: widthPixel(5),
    backgroundColor: colors.primary,
    borderRadius: widthPixel(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeTitle: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(12),
    color: colors.primary,
    width: '77%',
  },
  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: widthPixel(2.5),
    justifyContent: 'space-between',
  },
  subtitleStyles: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(12),
    marginLeft: widthPixel(10),
    color: colors.black,
    opacity: 0.3,
  },
  titleStyles: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(14),
    marginLeft: widthPixel(10),
    color: colors.black,
  },
  imgStyles: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
  },
  gameInfoCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: widthPixel(12),
    paddingVertical: widthPixel(8),
    backgroundColor: '#fff',
    borderRadius: widthPixel(12),
    marginBottom: widthPixel(10),
  },
});
