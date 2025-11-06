import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const BASE_URL = "http://172.20.10.13:8080/api";

type Vaga = {
  id: number;
  identificador: string;
  codigo: string;
  ocupada: boolean;
  patioId: number;
  patioNome: string;
  placaMoto: string | null;
};

type Patio = {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
  vagasDisponiveis: number;
  vagas: Vaga[];
};

export default function VagasScreen() {
  const { theme } = useTheme();

  const [patio, setPatio] = useState<Patio | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPatio = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/patios/1`);
      setPatio(res.data);
    } catch (err) {
      console.error("Erro ao buscar pátio:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatio();
    }, [])
  );

  const renderVaga = ({ item }: { item: Vaga }) => {
    const backgroundColor = item.placaMoto ? "#e74c3c" : "#2ecc71";

    return (
      <TouchableOpacity style={[styles.vagaBox, { backgroundColor }]} disabled>
        <Text style={styles.vagaText}>{item.identificador}</Text>
        {item.placaMoto && (
          <Text style={styles.placaText}>{item.placaMoto}</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading || !patio) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 10 }}>
          Carregando vagas...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>{patio.nome}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        {patio.endereco} • Vagas disponíveis: {patio.vagasDisponiveis}
      </Text>

      <FlatList
        data={patio.vagas}
        keyExtractor={(item) => String(item.id)}
        numColumns={5}
        columnWrapperStyle={styles.row}
        renderItem={renderVaga}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  vagaBox: {
    flexBasis: "18%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  vagaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  placaText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 4,
  },
});
