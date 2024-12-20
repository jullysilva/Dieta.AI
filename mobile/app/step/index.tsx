import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { colors } from "@/constants/colors";
import { Input } from "@/components/Input";

export default function Step() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    label: {
      fontSize: 16,
      color: colors.white,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome</Text>
        <Input placeholder="Digite seu nome" />
      </ScrollView>
    </View>
  );
}
