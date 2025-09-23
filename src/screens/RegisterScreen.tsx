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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        nome,
        email,
        senha,
        tipoUsuario: "CLIENTE", // você pode deixar fixo como CLIENTE
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado!");
        navigation.replace("Login");
      }
    } catch (error: any) {
      console.error("Erro ao registrar:", error.response || error.message);
      const msg = error.response?.data?.mensagem || "Erro ao registrar usuário";
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

      <Text style={[styles.title, { color: theme.text }]}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={theme.secondary}
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.secondary}
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={theme.secondary}
        secureTextEntry
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.goBack()}>
        <Text style={{ color: theme.primary }}>Voltar para Login</Text>
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
  themeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
