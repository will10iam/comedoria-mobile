
import { StyleSheet, View, StatusBar } from 'react-native';
import SignIn from './src/pages/SignIn';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1d1d2e" barStyle='light-content' translucent={false} />
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
