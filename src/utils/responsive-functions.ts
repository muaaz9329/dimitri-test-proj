import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const storageKey = {};

export const wp = (p: number) => WINDOW_WIDTH * (p / 100);
export const hp = (p: number) => WINDOW_HEIGHT * (p / 100);
export {WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH};

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const widthPixel = (size: number) => {
  return normalize(size, 'width');
};
const heightPixel = (size: number) => {
  return normalize(size, 'height');
};
const fontPixel = (size: number) => {
  return heightPixel(size);
};

export {widthPixel, heightPixel, fontPixel};
