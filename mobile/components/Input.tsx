import { colors } from "@/constants/colors";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { Controller } from "react-hook-form";

interface InputProps {
  name: string;
  placeholder?: string;
  control: any;
  rules?: object;
  error?: string;
  keyBoardType: KeyboardTypeOptions;
}

export function Input({
  placeholder,
  name,
  control,
  rules,
  error,
  keyBoardType,
}: InputProps) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      borderRadius: 8,
    },
    input: {
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      height: 44,
      borderRadius: 4,
    },
    errorText: {
      color: "red",
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={keyBoardType}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
