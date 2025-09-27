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
import axios from "axios";

import logoMottu from "../../assets/logo_mottu.png";
import mottu_sport from "../../assets/Mottu_sport.png";
import mottu_e from "../../assets/Mottu_E.png";
import mottu_pop from "../../assets/Mottu_pop.png";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();

  const [motos, setMotos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [status, setStatus] = useState("DISPONIVEL");
  const [editId, setEditId] = useState<string | null>(null);

  const API_URL = "http://10.0.2.2:8080/api/motos";

  const fetchMotos = async () => {
    try {
      const res = await axios.get(API_URL);
      setMotos(res.data);
    } catch (err) {
      console.log("Erro ao buscar motos:", err);
    }
  };

  useEffect(() => {
    fetchMotos();
  }, []);

  const handlePlacaChange = (text: string) => {
    let clean = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (clean.length > 3) clean = clean.slice(0, 3) + "-" + clean.slice(3, 7);
    setPlaca(clean.slice(0, 8));
  };

  const abrirModalEdicao = (motoId: string) => {
    const moto = motos.find((m) => m.id === motoId);
    if (!moto) return;

    setModelo(moto.modelo);
    setPlaca(moto.placa);
    setAno(String(moto.ano));
    setQuilometragem(String(moto.quilometragem));
    setStatus(moto.status);
    setEditId(moto.id);
    setModalVisible(true);
  };

  const adicionarOuEditarMoto = async () => {
    const placaRegex = /^[A-Z]{3}-\d[0-9A-Z]\d{2}$/;

    if (!modelo || !placa || !ano || !quilometragem || !status) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!placaRegex.test(placa)) {
      Alert.alert("Erro", "A placa deve seguir o formato ABC-1234 ou ABC-1D23.");
      return;
    }

    if (isNaN(Number(ano)) || Number(ano) < 2000) {
      Alert.alert("Erro", "Informe um ano válido.");
      return;
    }

    if (isNaN(Number(quilometragem))) {
      Alert.alert("Erro", "A quilometragem deve ser um número válido.");
      return;
    }

    const motoData = {
      placa,
      modelo,
      ano: Number(ano),
      quilometragem: Number(quilometragem),
      status,
      patioId: 1,
    };

    console.log("Dados enviados:", motoData);

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, motoData);
      } else {
        await axios.post(API_URL, motoData);
      }
      fetchMotos();
    } catch (err) {
      console.log("Erro ao salvar moto:", err);
      Alert.alert("Erro", "Não foi possível salvar a moto.");
    }

    setModalVisible(false);
    setModelo("");
    setPlaca("");
    setAno("");
    setQuilometragem("");
    setStatus("DISPONIVEL");
    setEditId(null);
  };

  const getMotoImage = (modelo: string) => {
    if (modelo === "MOTTU_SPORT") return mottu_sport;
    if (modelo === "MOTTU_E") return mottu_e;
    if (modelo === "MOTTU_POP") return mottu_pop;
    return mottu_sport;
  };

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

            {["MOTTU_SPORT", "MOTTU_E", "MOTTU_POP"].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.motoOption,
                  { backgroundColor: modelo === m ? theme.primary : theme.secondary + "30" },
                ]}
                onPress={() => setModelo(m)}
              >
                <Text style={{ color: theme.text }}>{m}</Text>
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
              placeholder="Ano"
              placeholderTextColor={theme.secondary}
              keyboardType="numeric"
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={ano}
              onChangeText={setAno}
            />
            <TextInput
              placeholder="Quilometragem"
              placeholderTextColor={theme.secondary}
              keyboardType="numeric"
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={quilometragem}
              onChangeText={setQuilometragem}
            />

            <Text style={{ color: theme.text, marginBottom: 5 }}>Status:</Text>
            {["DISPONIVEL", "OCUPADA", "MANUTENCAO"].map((s) => (
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

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => abrirModalEdicao(item.id)}
            style={[styles.motoCard, { backgroundColor: theme.secondary + "20" }]}
          >
            <Image source={getMotoImage(item.modelo)} style={styles.motoImage} />
            <View style={styles.motoInfo}>
              <Text style={[styles.motoText, { color: theme.text }]}>Modelo: {item.modelo}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Placa: {item.placa}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Ano: {item.ano}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>
                Quilometragem: {item.quilometragem}
              </Text>
              <Text style={[styles.motoText, { color: theme.text }]}>Status: {item.status}</Text>
              <Text style={[styles.motoText, { color: theme.text }]}>
                Vaga: {item.vagaCodigo || "Não atribuída"}
              </Text>
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
