import { SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './navigation/RootNavigation';
import FlashMessage from 'react-native-flash-message';
import { colors } from './utils/colors';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <RootNavigation />
        <FlashMessage
          position="top"
          autoHide
          hideStatusBar
          titleStyle={styles.toastStyle}
          textStyle={styles.toastStyle}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  toastStyle: {
    textAlign: 'center',
  },
});
