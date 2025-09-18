import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Perfil">;

export default function PerfilScreen({ navigation }: Props) {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Você realmente deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => navigation.replace("Login") },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Meu Perfil</Text>

      <View style={styles.infoBox}>
        <Text style={{ color: theme.text }}>Nome: João da Silva</Text>
        <Text style={{ color: theme.text }}>Email: joao@email.com</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.danger, marginTop: 15 }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  infoBox: { marginBottom: 30 },
  button: { padding: 15, borderRadius: 5, alignItems: "center", width: "80%" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
