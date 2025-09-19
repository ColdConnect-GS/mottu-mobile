import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = NativeStackScreenProps<RootStackParamList, "Perfil">;

type User = {
  nome: string;
  email: string;
  cpf?: string;
  senha: string;
  photo?: string;
};

export default function PerfilScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("loggedUser");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Você realmente deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("loggedUser");
          navigation.replace("Login");
        },
      },
    ]);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Ative o acesso às fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const updatedUser = { ...user, photo: result.assets[0].uri } as User;
      setUser(updatedUser);
      await AsyncStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {user.photo ? (
          <Image source={{ uri: user.photo }} style={styles.avatar} />
        ) : (
          <FontAwesome name="user-circle" size={100} color={theme.primary} />
        )}
        <Text style={{ color: theme.primary, marginTop: 5 }}>Alterar foto</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <View style={[styles.infoRow, { backgroundColor: theme.primary + "10" }]}>
          <Text style={[styles.label, { color: theme.text }]}>Nome:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.nome}</Text>
        </View>

        <View style={[styles.infoRow, { backgroundColor: theme.primary + "10" }]}>
          <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.email}</Text>
        </View>

        <View style={[styles.infoRow, { backgroundColor: theme.primary + "10" }]}>
          <Text style={[styles.label, { color: theme.text }]}>CPF:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.cpf || "Não informado"}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.danger }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  infoBox: { width: "100%", marginBottom: 30 },
  infoRow: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
  value: { fontSize: 16 },
  button: { padding: 15, borderRadius: 5, alignItems: "center", width: "80%" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
