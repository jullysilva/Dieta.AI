import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "@/constants/colors";
import { useDataStore } from "@/store/data";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Data } from "@/types/data";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Filed load nutrition");
        }

        const response = await api.post<ResponseData>("/create", user);

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerHeader: {
      backgroundColor: colors.white,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      paddingBottom: 20,
      paddingTop: 60,
      marginBottom: 16,
    },
    contentHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 16,
      paddingRight: 16,
    },
    content: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    loading: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      fontSize: 18,
      color: colors.white,
      marginBottom: 4,
    },
    title: {
      fontSize: 28,
      color: colors.background,
      fontWeight: "bold",
    },
    buttonShare: {
      backgroundColor: colors.green,
      padding: 8,
      gap: 4,
      flexDirection: "row",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonShareText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "500",
    },
    name: {
      fontSize: 20,
      color: colors.white,
      fontWeight: "bold",
    },
    objective: {
      fontSize: 16,
      color: colors.white,
      marginBottom: 24,
    },
    label: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 16,
    },
    foods: {
      backgroundColor: colors.white,
      padding: 14,
      borderRadius: 8,
      marginTop: 8,
      gap: 8,
    },
    food: {
      backgroundColor: "rgba(208,208,208,0.40)",
      padding: 8,
      borderRadius: 4,
    },
    foodHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    foodName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    foodContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    foodText: {
      fontSize: 16,
      marginBottom: 4,
      marginTop: 14,
    },
    suplementos: {
      backgroundColor: colors.white,
      marginTop: 14,
      marginBottom: 14,
      padding: 14,
      borderRadius: 8,
    },
    button: {
      backgroundColor: colors.blue,
      height: 40,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
        <Text style={{ color: colors.orange }}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href="/step">
          <Text style={{ color: colors.orange }}>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      if (data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map((item) => `${item}`)}`;

      const foods = `${data?.refeicoes.map(
        (item) =>
          `\n - Nome: ${item.nome}\n - Horário: ${
            item.horario
          }\n - Alimentos: ${item.alimentos.map((alimento) => ` ${alimento}`)}`
      )}`;

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica suplementos: ${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha Dieta</Text>
          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
            <Feather name="share-2" size={16} color={"#FFF"} />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>

            <Text style={styles.label}>Refeições: </Text>
            <ScrollView>
              <View style={styles.foods}>
                {data.refeicoes.map((refeicao) => (
                  <View key={refeicao.nome} style={styles.food}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{refeicao.nome}</Text>
                      <Ionicons name="restaurant" size={16} color={"#000"} />
                    </View>
                    <View style={styles.foodContent}>
                      <Feather name="clock" size={14} color={"#000"} />
                      <Text>{refeicao.horario}</Text>
                    </View>
                    <View>
                      <Text style={styles.foodText}>Alimentos</Text>
                      {refeicao.alimentos.map((alimento) => (
                        <Text key={alimento}>{alimento}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.suplementos}>
                <Text style={styles.foodName}>Dica suplementos</Text>
                {data.suplementos.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </View>
              <Pressable
                style={styles.button}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.buttonText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}
