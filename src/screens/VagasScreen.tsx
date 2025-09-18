import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const vagasMock = [
  { id: "1", vaga: "A1", status: "Ocupada" },
  { id: "2", vaga: "A2", status: "Livre" },
  { id: "3", vaga: "B1", status: "Ocupada" },
];

export default function VagasScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Vagas</Text>

      <FlatList
        data={vagasMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: theme.primary }]}>
            <Text style={{ color: theme.text }}>Vaga: {item.vaga}</Text>
            <Text style={{ color: item.status === "Livre" ? theme.success : theme.danger }}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
});
