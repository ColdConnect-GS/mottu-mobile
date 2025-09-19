import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const usersRaw = await AsyncStorage.getItem("users");
      if (!usersRaw) {
        Alert.alert("Erro", "Nenhum usuário cadastrado!");
        return;
      }

      const users = JSON.parse(usersRaw);
      const user = users.find((u: any) => u.email === email && u.senha === senha);

      if (!user) {
        Alert.alert("Erro", "Email ou senha incorretos!");
        return;
      }

      await AsyncStorage.setItem("loggedUser", JSON.stringify(user));
      navigation.replace("Main");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo */}
      <Image
        source={require("../../assets/logo_mottu.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: theme.text }]}>Login</Text>

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
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
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
  logo: { width: 120, height: 120, marginBottom: 20 }, // tamanho e espaçamento da logo
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderRadius: 5, marginBottom: 15 },
  button: { width: "100%", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
