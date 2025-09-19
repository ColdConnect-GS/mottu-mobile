import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeContext";

// Importação da logo e fotos das motos do assets
import logoMottu from "../../assets/logo_mottu.png";
import mottu_sport from "../../assets/Mottu_sport.png";
import mottu_e from "../../assets/Mottu_E.png";
import mottu_pop from "../../assets/Mottu_pop.png";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [motos, setMotos] = useState([
    { id: "1", nome: "Mottu Sport", placa: "ABC-1234", vaga: "A1", foto: mottu_sport },
    { id: "2", nome: "Mottu-E", placa: "XYZ-5678", vaga: "B3", foto: mottu_e },
    { id: "3", nome: "Mottu Pop", placa: "LMN-9012", vaga: "C2", foto: mottu_pop },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState("");
  const [placa, setPlaca] = useState("");
  const [vaga, setVaga] = useState("");

  const adicionarMoto = () => {
    // Validação
    const placaRegex = /^[A-Z]{3}-\d[0-9A-Z]\d{2}$/;
    const vagaRegex = /^[A-Z][0-9]$/;

    if (!selectedMoto || !placa || !vaga) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!placaRegex.test(placa)) {
      Alert.alert("Erro", "A placa deve seguir o formato ABC-1234.");
      return;
    }

    if (!vagaRegex.test(vaga)) {
      Alert.alert("Erro", "A vaga deve ter 2 caracteres, letra + número (ex: A1, B5).");
      return;
    }

    let foto;
    if (selectedMoto === "Mottu Sport") foto = mottu_sport;
    else if (selectedMoto === "Mottu-E") foto = mottu_e;
    else if (selectedMoto === "Mottu Pop") foto = mottu_pop;

    const novaMoto = {
      id: (motos.length + 1).toString(),
      nome: selectedMoto,
      placa,
      vaga,
      foto,
    };

    setMotos([...motos, novaMoto]);
    setModalVisible(false);
    setSelectedMoto("");
    setPlaca("");
    setVaga("");
  };

  // Função para inserir "-" automaticamente na placa
  const handlePlacaChange = (text: string) => {
    let clean = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (clean.length > 3) clean = clean.slice(0, 3) + "-" + clean.slice(3, 7);
    setPlaca(clean.slice(0, 8));
  };

  // Função para limitar vaga a 2 caracteres
  const handleVagaChange = (text: string) => {
    setVaga(text.toUpperCase().slice(0, 2));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo */}
      <Image source={logoMottu} style={styles.logo} resizeMode="contain" />

      <Text style={[styles.title, { color: theme.text }]}>
        Bem-vindo ao Pátio da Mottu
      </Text>

      {/* Botão Adicionar Moto */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Adicionar Moto na Vaga</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Adicionar Moto
            </Text>

            {/* Seleção da moto */}
            {["Mottu Sport", "Mottu-E", "Mottu Pop"].map((moto) => (
              <TouchableOpacity
                key={moto}
                style={[
                  styles.motoOption,
                  {
                    backgroundColor:
                      selectedMoto === moto ? theme.primary : theme.secondary + "30",
                  },
                ]}
                onPress={() => setSelectedMoto(moto)}
              >
                <Text style={{ color: theme.text }}>{moto}</Text>
              </TouchableOpacity>
            ))}

            <TextInput
              placeholder="Placa (ABC-1234)"
              placeholderTextColor={theme.secondary}
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={placa}
              onChangeText={handlePlacaChange}
            />

            <TextInput
              placeholder="Vaga (A1)"
              placeholderTextColor={theme.secondary}
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={vaga}
              onChangeText={handleVagaChange}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.primary }]}
                onPress={adicionarMoto}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.danger }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FlatList com motos */}
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.motoCard, { backgroundColor: theme.secondary + "20" }]}>
            <Image source={item.foto} style={styles.motoImage} />
            <View style={styles.motoInfo}>
              <Text style={[styles.motoText, { color: theme.text }]}>
                Nome: {item.nome}
              </Text>
              <Text style={[styles.motoText, { color: theme.text }]}>
                Placa: {item.placa}
              </Text>
              <Text style={[styles.vagaText, { color: theme.text }]}>
                Vaga: {item.vaga}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  logo: { width: 60, height: 60, alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  addButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  motoCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  motoImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  motoInfo: { flex: 1 },
  motoText: { fontSize: 16, marginBottom: 5 },
  vagaText: { fontSize: 14, fontWeight: "600", color: "#555" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000060" },
  modalContent: { width: "85%", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  motoOption: { padding: 10, borderRadius: 5, marginBottom: 10, alignItems: "center" },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
});
