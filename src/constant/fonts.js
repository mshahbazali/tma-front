import * as Font from 'expo-font'
export default useFonts = async () =>
  await Font.loadAsync({
    PoppinsRegular: require('../../assets/Fonts/Poppins-Regular.tff'),
    // indie: require('../assets/fonts/Ubuntu-BoldItalic.ttf'),
  });