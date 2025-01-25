import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Exercise } from '../types/exercise';
import { colors } from '../utils/colors';

import { Ionicons } from '@expo/vector-icons';

type ExerciseCardProps = {
  exercise: Exercise;
  onDelete: (id: string) => void;
};

export const ExerciseCard = ({ exercise, onDelete }: ExerciseCardProps) => {
  const { name, sets, reps, weight, date, id } = exercise;

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete the exercise "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.date}>
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={20} color={colors.danger} />
          {/* <Text style={styles.deleteText}>Delete</Text> */}
        </Pressable>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Sets</Text>
          <Text style={styles.statValue}>{sets}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Reps</Text>
          <Text style={styles.statValue}>{reps}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Weight</Text>
          <Text style={styles.statValue}>{weight} lbs</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deleteText: {
    marginLeft: 6,
    color: colors.secondary,
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
