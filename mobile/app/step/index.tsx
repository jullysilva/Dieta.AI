import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { colors } from "@/constants/colors";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { useDataStore } from "@/store/data";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório!" }),
  weight: z.string().min(1, { message: "O peso é obrigatório!" }),
  age: z.string().min(1, { message: "A idade é obrigatória!" }),
  height: z.string().min(1, { message: "A altura é obrigatória!" }),
});

type FormData = z.infer<typeof schema>;

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageOne = useDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height,
    });

    router.push("/create");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome</Text>
        <Input
          name="name"
          placeholder="Digite seu nome..."
          control={control}
          error={errors.name?.message}
          keyBoardType="default"
        />

        <Text style={styles.label}>Peso atual</Text>
        <Input
          name="weight"
          placeholder="Ex. 75"
          control={control}
          error={errors.weight?.message}
          keyBoardType="default"
        />

        <Text style={styles.label}>Altura</Text>
        <Input
          name="height"
          placeholder="169"
          control={control}
          error={errors.height?.message}
          keyBoardType="default"
        />

        <Text style={styles.label}>Idade</Text>
        <Input
          name="age"
          placeholder="25"
          control={control}
          error={errors.age?.message}
          keyBoardType="default"
        />
        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
