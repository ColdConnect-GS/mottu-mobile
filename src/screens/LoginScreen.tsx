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
import { RootStackParamList } from "../../App"; // Ajuste o caminho se necessário
import { useTheme } from "../theme/ThemeContext"; // Ajuste o caminho se necessário
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

      // --- CORREÇÃO APLICADA AQUI ---
      // Verificamos se a mensagem de sucesso foi retornada pelo backend.
      const loginSuccess = response.data?.message === "Login realizado com sucesso";

      if (loginSuccess) {
        // O login foi bem-sucedido.
        const user = { username };

        // Salva um indicador de que o usuário está logado e seus dados.
        await AsyncStorage.setItem("userToken", "true"); // Usamos "true" como indicador de login
        await AsyncStorage.setItem("loggedUser", JSON.stringify(user));

        // Navega para a tela principal
        navigation.replace("Main");

      } else {
        // Se o backend respondeu com sucesso (status 200), mas não com a mensagem esperada.
        const errorMessage = response.data?.message || "Usuário ou senha incorretos!";
        Alert.alert("Erro", errorMessage);
      }
    } catch (error: any) {
      // Este bloco 'catch' é executado para erros de rede ou respostas com status de erro (4xx, 5xx).
      console.error("Erro no login:", error.response?.data || error.message);
      const msg = error.response?.data?.message || "Usuário ou senha incorretos!";
      Alert.alert("Erro", msg);
    } finally {
      // Garante que o estado de 'loading' seja desativado ao final da operação.
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
        source={require("../../assets/logo_mottu.png")} // Ajuste o caminho se necessário
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