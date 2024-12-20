import { colors } from "@/constants/colors";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  placeholder: string;
}

export function Input({ placeholder }: InputProps) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    input: {
      backgroundColor: colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
}
