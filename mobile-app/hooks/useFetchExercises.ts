import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { Exercise } from '../types/exercise';
import { API_URL } from '../utils/apiUrl';

const useFetchExercises = (deviceId: string | null) => {
  const [exercises, setExercises] = useState<Exercise[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = useCallback(async () => {
    if (!deviceId) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${deviceId}/exercises`);
      setExercises(response.data || []);
      setError(null);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useFocusEffect(
    useCallback(() => {
      fetchExercises();
    }, [fetchExercises])
  );

  useEffect(() => {
    fetchExercises();
  }, [deviceId]);

  return { exercises, loading, error, refetch: fetchExercises };
};

export default useFetchExercises;
