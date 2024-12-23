import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { colors } from "@/constants/colors";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select } from "@/components/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório!" }),
  level: z.string().min(1, { message: "Selecione seu nível." }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório!" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
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
    button: {
      backgroundColor: colors.blue,
      height: 44,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const Options = {
    gender: [
      {
        label: "Masculino",
        value: "masculino",
      },
      {
        label: "Feminino",
        value: "feminino",
      },
    ],
    objective: [
      { label: "Emagrecer", value: "emagrecer" },
      { label: "Hipertrofia", value: "Hipertrofia" },
      { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
      { label: "Definição", value: "Definição" },
    ],
    level: [
      {
        label: "Sedentário (pouco ou nenhuma atividade física)",
        value: "Sedentário",
      },
      {
        label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
        value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      },
      {
        label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
        value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      },
      {
        label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
        value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
      },
    ],
  };

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      objective: data.objective,
      level: data.level,
    });

    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione algo..."
          error={errors.gender?.message}
          options={Options.gender}
        />

        <Text style={styles.label}>Seu objetivo</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione seu objetivo..."
          error={errors.objective?.message}
          options={Options.objective}
        />

        <Text style={styles.label}>Nível de atividade física</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione seu nível..."
          error={errors.level?.message}
          options={Options.level}
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Gerar dieta</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
