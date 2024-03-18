/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import { Dimensions, PixelRatio } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const scaleWidth = SCREEN_WIDTH / 375;
const scaleHeight = SCREEN_HEIGHT / 812;

export const normalize = (size, forHeight = false) => {
  const newSize = size * (forHeight ? scaleHeight : scaleWidth);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const theme = {
  colors: {
    primary: '#7b337e',
    secondary: '#f0e4fa',
    inactive: '#eef1f8',
    background: '#ffffff',
    grey: '#979797',
    text: '#333333',
    accent: '#ffa500',
    error: '#ff0000',
  },
  spacing: {
    small: normalize(8),
    medium: normalize(16),
    large: normalize(24),
  },
  button: {
    small: normalize(110),
    medium: normalize(220),
    large: normalize(330),
  },
  fullLengthButton: {
    padding: normalize(12),
    width: normalize(340),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(8),
  },
  inputContainer: {
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(16),
    width: normalize(340),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: normalize(1),
    borderColor: '#979797',
    borderRadius: normalize(8),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderRadius: normalize(8),
};
export default theme;