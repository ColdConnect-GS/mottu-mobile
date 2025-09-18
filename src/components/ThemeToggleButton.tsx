import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, isDark, theme } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Text style={[styles.text, { color: theme.text }]}>{isDark ? "☀️" : "🌙"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    padding: 5,
  },
  text: {
    fontSize: 22,
  },
});
