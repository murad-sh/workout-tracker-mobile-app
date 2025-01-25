import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ExerciseCard } from '../components/ExerciseCard';
import { useDeviceId } from '../hooks/useDeviceId';
import useFetchExercises from '../hooks/useFetchExercises';
import { colors } from '../utils/colors';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';
import { showMessage } from 'react-native-flash-message';

export const ProgressScreen = () => {
  const deviceId = useDeviceId();
  const { exercises, loading, refetch } = useFetchExercises(deviceId);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/exercises/${id}`);
      showMessage({
        message: 'Exercise Deleted',
        description: 'Your exercise has been successfully deleted',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'An error occurred while deleting the exercise',
        type: 'danger',
      });
    } finally {
      refetch();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Most Recent Exercises</Text>

      {loading && !exercises.length && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 16 }}
        />
      )}
      <FlatList
        data={exercises.slice().reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.secondary,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
