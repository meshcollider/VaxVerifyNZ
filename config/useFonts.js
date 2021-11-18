import * as Font from 'expo-font'

var useFonts
export default useFonts = async () => {
    await Font.loadAsync({
        WorkSans_Black: require('../assets/fonts/WorkSans-Black.ttf'),
        WorkSans_ExtraBold: require('../assets/fonts/WorkSans-ExtraBold.ttf'),
        WorkSans_Bold: require('../assets/fonts/WorkSans-Bold.ttf'),
        WorkSans_SemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf'),
        WorkSans_Medium: require('../assets/fonts/WorkSans-Medium.ttf'),
        WorkSans_Regular: require('../assets/fonts/WorkSans-Regular.ttf'),
        WorkSans_Light: require('../assets/fonts/WorkSans-Light.ttf'),
        WorkSans_Thin: require('../assets/fonts/WorkSans-Thin.ttf'),
    })
}
