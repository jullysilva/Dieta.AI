import { colors } from "@/constants/colors";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Controller } from "react-hook-form";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

interface OptionProps {
  label: String;
  value: String | number;
}

interface SelectProps {
  name: string;
  placeholder?: string;
  control: any;
  error?: string;
  options: OptionProps[];
}

export function Select({
  placeholder,
  name,
  control,
  error,
  options,
}: SelectProps) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      borderRadius: 8,
    },
    select: {
      flexDirection: "row",
      height: 44,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    modalContainer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      flex: 1,
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: colors.white,
      marginHorizontal: 10,
      borderRadius: 8,
      padding: 20,
    },
    option: {
      paddingVertical: 14,
      backgroundColor: "rgba(208,208,208,0.40)",
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    errorText: {
      color: "red",
      marginTop: 4,
    },
  });

  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setVisible(true)}
            >
              <Text>
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color={colors.black} />
            </TouchableOpacity>
            <Modal
              visible={visible}
              animationType="fade"
              onRequestClose={() => setVisible(false)}
              transparent={true}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
