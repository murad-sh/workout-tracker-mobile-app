import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { PrimaryButton } from './ui/PrimaryButton';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';

import { useNavigation } from '@react-navigation/native';

import { showMessage } from 'react-native-flash-message';
import { colors } from '../utils/colors';
import { useDeviceId } from '../hooks/useDeviceId';

type ExerciseForm = {
  name: string;
  sets: string;
  reps: string;
  weight: string;
};

export const AddExerciseForm = () => {
  const [form, setForm] = useState<ExerciseForm>({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const navigation = useNavigation();
  const deviceId = useDeviceId();

  const handleInputChange = (field: keyof ExerciseForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { name, sets, reps, weight } = form;
    if (!name.trim() || !sets || !reps || !weight) {
      showMessage({
        message: 'All fields are required',
        type: 'danger',
        description: 'Please fill out all fields',
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/exercises`, {
        name,
        sets,
        reps,
        weight,
        date: new Date().toISOString(),
        'device-id': deviceId,
      });

      setForm({ name: '', sets: '', reps: '', weight: '' });
      showMessage({
        message: 'Exercise added successfully',
        description: 'Your exercise has been added successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      showMessage({
        message: 'An error occurred',
        description: 'An error occurred while adding your exercise',
        type: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Enter your exercise details below</Text>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={form.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          style={styles.input}
          placeholder="Sets"
          keyboardType="numeric"
          value={form.sets}
          onChangeText={(value) => handleInputChange('sets', value)}
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          style={styles.input}
          placeholder="Reps"
          keyboardType="numeric"
          value={form.reps}
          onChangeText={(value) => handleInputChange('reps', value)}
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={form.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
        />

        <PrimaryButton label="Add Exercise" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.secondary,
  },
});
