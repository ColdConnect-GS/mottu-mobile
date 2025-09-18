import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

export default function LogoutButton() {
  const { theme } = useTheme();

  // Força o tipo do navigation para poder usar replace
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={[styles.text, { color: theme.text }]}>🚪</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    padding: 5,
  },
  text: {
    fontSize: 22,
  },
});
