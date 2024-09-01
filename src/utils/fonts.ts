const fontFamily = {
  PoppinsBlack: 'Poppins-Black',
  PoppinsBlackItalic: 'Poppins-BlackItalic',
  PoppinsBold: 'Poppins-Bold',
  PoppinsBoldItalic: 'Poppins-BoldItalic',
  PoppinsExtraBold: 'Poppins-ExtraBold',
  PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  PoppinsExtraLight: 'Poppins-ExtraLight',
  PoppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
  PoppinsItalic: 'Poppins-Italic',
  PoppinsLight: 'Poppins-Light',
  PoppinsLightItalic: 'Poppins-LightItalic',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsMediumItalic: 'Poppins-MediumItalic',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
  PoppinsThin: 'Poppins-Thin',
  PoppinsThinItalic: 'Poppins-ThinItalic',
};

const Poppins = (weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800) => {
  switch (Number(weight)) {
    case 100:
      return fontFamily.PoppinsExtraLight;
    case 200:
      return fontFamily.PoppinsLight;
    case 300:
      return fontFamily.PoppinsThin;
    case 400:
      return fontFamily.PoppinsRegular;
    case 500:
      return fontFamily.PoppinsMedium;
    case 600:
      return fontFamily.PoppinsSemiBold;
    case 700:
      return fontFamily.PoppinsBold;
    case 800:
      return fontFamily.PoppinsExtraBold;
    default:
      return fontFamily.PoppinsRegular;
  }
};

export {fontFamily, Poppins};
