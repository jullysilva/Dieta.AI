import { colors } from "@/constants/colors";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderBottomRightRadius: 14,
      borderBottomLeftRadius: 14,
      marginBottom: 14,
      paddingTop:
        Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
    },
    content: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 34,
      borderBottomRightRadius: 14,
      borderBottomLeftRadius: 14,
    },
    row: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.black} />
          </Pressable>
          <Text style={styles.text}>
            {step}
            <Feather name="loader" size={16} color={colors.black} />
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
