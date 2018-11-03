import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  CARD_HEIGHT: height / 5,
  CARD_WIDTH: height/5 + 50,
};
