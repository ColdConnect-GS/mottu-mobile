import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
  onPress={() => navigation.replace("Main")} // redireciona para o TabNavigator
>
  <Text style={styles.buttonText}>Cadastrar</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderRadius: 5, marginBottom: 15 },
  button: { width: "100%", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
