import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import VagasScreen from "../screens/VagasScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { useTheme } from "../theme/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ThemeEmojiSwitch from "../components/ThemeEmojiSwitch";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <ThemeEmojiSwitch />,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,
        tabBarStyle: { backgroundColor: theme.background },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") iconName = "home";
          if (route.name === "Vagas") iconName = "motorcycle";
          if (route.name === "Perfil") iconName = "user";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vagas" component={VagasScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
