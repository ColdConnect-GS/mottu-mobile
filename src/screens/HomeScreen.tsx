import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Bem-vindo ao Pátio de Motos</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("Vagas")}
      >
        <Text style={styles.buttonText}>Gerenciar Vagas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Text style={styles.buttonText}>Meu Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 30, fontWeight: "bold" },
  button: {
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
