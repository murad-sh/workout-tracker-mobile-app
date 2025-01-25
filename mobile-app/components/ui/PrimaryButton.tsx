import { PropsWithChildren } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '../../utils/colors';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export const PrimaryButton = ({
  label,
  onPress,
  containerStyle,
  labelStyle,
  children,
}: PrimaryButtonProps) => {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
