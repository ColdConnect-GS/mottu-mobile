import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      console.log("Enviando login:", { username, password });

      const response = await axios({
        method: "POST",
        url: "http://10.0.2.2:8080/api/auth/login", // ajuste o IP se estiver em dispositivo real
        headers: { "Content-Type": "application/json" },
        data: { username, password },
      });

      console.log("Resposta do backend:", response.data);

      const token = response.data.token || response.data.accessToken;
      const user = response.data.user || { username };

      if (!token) {
        Alert.alert("Erro", "Usuário ou senha incorretos!");
        setLoading(false);
        return;
      }

      // Salva token e usuário no AsyncStorage
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("loggedUser", JSON.stringify(user));

      // Navega para a Main/HomeScreen
      navigation.replace("Main");
    } catch (error: any) {
      console.error("Erro no login:", error.response || error.message);
      const msg = error.response?.data?.mensagem || "Erro ao fazer login";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão de trocar tema */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={{ fontSize: 22 }}>{isDarkMode ? "☀️" : "🌙"}</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/logo_mottu.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: theme.text }]}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.secondary}
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={theme.secondary}
        secureTextEntry
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: theme.primary, marginTop: 15 }}>
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: { width: "100%", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  themeButton: { position: "absolute", top: 40, right: 20, zIndex: 10 },
});
