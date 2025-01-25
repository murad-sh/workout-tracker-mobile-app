import * as Application from 'expo-application';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const getDeviceUniqueId = async () => {
  if (Platform.OS === 'android') {
    return Application.getAndroidId();
  }
  return await Application.getIosIdForVendorAsync();
};

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    getDeviceUniqueId().then((id) => {
      setDeviceId(id);
    });
  }, []);

  return deviceId;
};
