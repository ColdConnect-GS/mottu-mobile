import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

// Importação direta da logo
import logoMottu from "../../assets/logo_mottu.png";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo */}
      <Image
        source={logoMottu}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: theme.text }]}>
        Bem-vindo ao Pátio de Motos
      </Text>

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
  logo: { width: 60, height: 60, marginBottom: 20 }, // reduzido para metade
  title: { fontSize: 22, marginBottom: 30, fontWeight: "bold", textAlign: "center" },
  button: {
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});