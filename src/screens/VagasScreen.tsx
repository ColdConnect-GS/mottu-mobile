import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const gerarVagas = () => {
  const vagas: { id: string; status: "Livre" | "Ocupada" }[] = [];
  const letras = "ABCDEFGH"; // 8 linhas
for (let i = 0; i < letras.length; i++) { // linhas
  for (let j = 1; j <= 10; j++) { // 10 colunas
    vagas.push({
      id: `${letras[i]}${j}`,
      status: Math.random() > 0.5 ? "Livre" : "Ocupada",
    });
  }
}
  return vagas;
};

export default function VagasScreen() {
  const { theme } = useTheme();
  const [vagas, setVagas] = useState(gerarVagas());

  const toggleVaga = (id: string) => {
    const updated = vagas.map((v) =>
      v.id === id ? { ...v, status: v.status === "Livre" ? "Ocupada" : "Livre" } : v
    );
    setVagas(updated);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Vagas</Text>

      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        numColumns={10}
        columnWrapperStyle={styles.row} // espaçamento entre colunas
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.vagaBox,
              {
                backgroundColor: item.status === "Livre" ? theme.success : theme.danger,
              },
            ]}
            onPress={() => toggleVaga(item.id)}
          >
            <Text style={styles.vagaText}>{item.id}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  row: { justifyContent: "space-between", marginBottom: 40 },
  vagaBox: {
    flexBasis: "9%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  vagaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
