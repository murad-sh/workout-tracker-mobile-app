import { View, Text, StyleSheet, Image } from 'react-native';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { StackScreenProps } from '@react-navigation/stack';
import { ManageExercisesParamsList } from '../navigation/RootNavigation';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export const HomeScreen = ({
  navigation,
}: StackScreenProps<ManageExercisesParamsList>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Fitness Journey Today!</Text>
      <View style={styles.content}>
        <Image
          source={require('../assets/hero2.avif')}
          style={styles.image}
          resizeMethod="resize"
        />
        <PrimaryButton
          label="Add Exercise"
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
          onPress={() => {
            navigation.navigate('AddExercise');
          }}
        >
          <Ionicons
            name="add-outline"
            size={22}
            color="#fff"
            style={{
              fontWeight: 'bold',
            }}
          />
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 72,
    paddingHorizontal: 16,
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 38,
    color: colors.secondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 52,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '76%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
