import React, { useState, useEffect } from "react";
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
import { getMotos } from "../services/api"; // Função para buscar motos do backend

import logoMottu from "../../assets/logo_mottu.png";
import mottu_sport from "../../assets/Mottu_sport.png";
import mottu_e from "../../assets/Mottu_E.png";
import mottu_pop from "../../assets/Mottu_pop.png";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();

  // =========================
  // Estados
  // =========================
  const [motos, setMotos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState("");
  const [placa, setPlaca] = useState("");
  const [vaga, setVaga] = useState("");
  const [patio, setPatio] = useState("");
  const [km, setKm] = useState("");
  const [status, setStatus] = useState("Livre");
  const [editId, setEditId] = useState<string | null>(null);

  // =========================
  // Função para buscar motos do backend
  // =========================
  const fetchMotos = async () => {
    try {
      const response = await getMotos();
      setMotos(response.data);
    } catch (err) {
      console.log("Erro ao buscar motos:", err);
    }
  };

  // =========================
  // useEffect para rodar fetchMotos quando a tela abrir
  // =========================
  useEffect(() => {
    fetchMotos();
  }, []);

  // =========================
  // Funções de input
  // =========================
  const handlePlacaChange = (text: string) => {
    let clean = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (clean.length > 3) clean = clean.slice(0, 3) + "-" + clean.slice(3, 7);
    setPlaca(clean.slice(0, 8));
  };

  const handleVagaChange = (text: string) => {
    setVaga(text.toUpperCase().slice(0, 2));
  };

  const abrirModalEdicao = (motoId: string) => {
    const moto = motos.find((m) => m.id === motoId);
    if (!moto) return;

    setSelectedMoto(moto.nome);
    setPlaca(moto.placa);
    setVaga(moto.vaga);
    setPatio(moto.patio);
    setKm(moto.km);
    setStatus(moto.status);
    setEditId(moto.id);
    setModalVisible(true);
  };

  // =========================
  // Adicionar ou editar moto
  // =========================
  const adicionarOuEditarMoto = () => {
    const placaRegex = /^[A-Z]{3}-\d[0-9A-Z]\d{2}$/;
    const vagaRegex = /^[A-Z][0-9]$/;

    if (!selectedMoto || !placa || !vaga || !patio || !km || !status) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!placaRegex.test(placa)) {
      Alert.alert("Erro", "A placa deve seguir o formato ABC-1234 ou ABC-1D23.");
      return;
    }

    if (!vagaRegex.test(vaga)) {
      Alert.alert("Erro", "A vaga deve ter 2 caracteres, letra + número (ex: A1, B5).");
      return;
    }

    if (isNaN(Number(km))) {
      Alert.alert("Erro", "A quilometragem deve ser um número válido.");
      return;
    }

    let foto;
    if (selectedMoto === "Mottu Sport") foto = mottu_sport;
    else if (selectedMoto === "Mottu-E") foto = mottu_e;
    else if (selectedMoto === "Mottu Pop") foto = mottu_pop;

    if (editId) {
      // Editar moto existente
      const motosAtualizadas = motos.map((m) =>
        m.id === editId ? { ...m, nome: selectedMoto, placa, vaga, patio, km, status, foto } : m
      );
      setMotos(motosAtualizadas);
    } else {
      // Adicionar nova moto
      const novaMoto = {
        id: (motos.length + 1).toString(),
        nome: selectedMoto,
        placa,
        vaga,
        patio,
        km,
        status,
        foto,
      };
      setMotos([...motos, novaMoto]);
    }

    // Resetar modal
    setModalVisible(false);
    setSelectedMoto("");
    setPlaca("");
    setVaga("");
    setPatio("");
    setKm("");
    setStatus("Livre");
    setEditId(null);
  };

  // =========================
  // JSX
  // =========================
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={logoMottu} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: theme.text }]}>Bem-vindo ao Pátio da Mottu</Text>

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
              {editId ? "Editar Moto" : "Adicionar Moto"}
            </Text>

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

            <TextInput
              placeholder="Pátio (ex: Pátio A)"
              placeholderTextColor={theme.secondary}
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={patio}
              onChangeText={(t) => setPatio(t)}
            />

            <TextInput
              placeholder="Quilometragem (KM)"
              placeholderTextColor={theme.secondary}
              keyboardType="numeric"
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={km}
              onChangeText={(t) => setKm(t)}
            />

            <Text style={{ color: theme.text, marginBottom: 5 }}>Status:</Text>
            {["Livre", "Ocupada", "Manutenção"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.motoOption,
                  { backgroundColor: status === s ? theme.primary : theme.secondary + "30" },
                ]}
                onPress={() => setStatus(s)}
              >
                <Text style={{ color: theme.text }}>{s}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.primary }]}
                onPress={adicionarOuEditarMoto}
              >
                <Text style={styles.buttonText}>{editId ? "Salvar" : "Confirmar"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.danger }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditId(null);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Listagem */}
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => abrirModalEdicao(item.id)}
            style={[styles.motoCard, { backgroundColor: theme.secondary + "20" }]}
          >
            <Image source={item.foto} style={styles.motoImage} />
            <View style={styles.motoInfo}>
              <Text style={[styles.motoText, { color: theme.text }]}>Nome: {item.nome}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Placa: {item.placa}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Vaga: {item.vaga}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Pátio: {item.patio}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>KM: {item.km}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  logo: { width: 60, height: 60, alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  addButton: { padding: 15, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  motoCard: { flexDirection: "row", padding: 10, marginBottom: 15, borderRadius: 8, alignItems: "center" },
  motoImage: { width: 120, height: 80, borderRadius: 8, marginRight: 15 },
  motoInfo: { flex: 1 },
  motoText: { fontSize: 16, marginBottom: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000060" },
  modalContent: { width: "85%", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  motoOption: { padding: 10, borderRadius: 5, marginBottom: 10, alignItems: "center" },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
});
