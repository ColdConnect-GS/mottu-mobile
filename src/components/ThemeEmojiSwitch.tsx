import React from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeEmojiSwitch() {
  const { isDark, toggleTheme } = useTheme();
  const animatedValue = new Animated.Value(isDark ? 1 : 0);

  // animação do emoji deslizando
  Animated.timing(animatedValue, {
    toValue: isDark ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTheme}>
      <Text style={styles.emoji}>{isDark ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
});
