import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha || !cpf) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const newUser = { nome, email, senha, cpf };

    try {
      const usersRaw = await AsyncStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some((u: any) => u.email === email)) {
        Alert.alert("Erro", "Email já cadastrado!");
        return;
      }

      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("loggedUser", JSON.stringify(newUser));

      Alert.alert("Sucesso", "Cadastro realizado!");
      navigation.replace("Main");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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

      <TextInput
        placeholder="CPF"
        placeholderTextColor={theme.secondary}
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        value={cpf}
        onChangeText={setCpf}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão para voltar ao login */}
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: theme.primary }}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 }, // tamanho e espaçamento da logo
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderRadius: 5, marginBottom: 15 },
  button: { width: "100%", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
